const amqplib = require("amqplib");
const _ = require('lodash')
const { v4: uuid4 } = require("uuid");
const {
  APP_SECRET,
  EXCHANGE_NAME,
  MSG_QUEUE_URL,
} = require("../config");

let amqplibConnection = null;
//Utility functions

module.exports.getIntoData = async ({ fileds = [], object = {} }) => {

  return _.pick(object, fileds)
};

//Message Broker
const getChannel = async () => {
  if (amqplibConnection === null) {
    amqplibConnection = await amqplib.connect(MSG_QUEUE_URL);
  }
  return await amqplibConnection.createChannel();
};

module.exports.CreateChannel = async () => {
  try {
    const channel = await getChannel();
    await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
};

module.exports.RPCObserver = async (RPC_QUEUE_NAME, service) => {
  const channel = await getChannel();
  await channel.assertQueue(RPC_QUEUE_NAME, {
    durable: false,
  });
  channel.prefetch(1);
  channel.consume(
    RPC_QUEUE_NAME,
    async (msg) => {
      if (msg.content) {
        // DB Operation
        const payload = JSON.parse(msg.content.toString());
        const response = await service.serveRPCRequest(payload);
        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        channel.ack(msg);
      }
    },
    {
      noAck: false,
    }
  );
};
const requestData = async (RPC_QUEUE_NAME, requestPayload, uuid) => {
  try {
    const channel = await getChannel();

    const q = await channel.assertQueue("", { exclusive: true });

    channel.sendToQueue(
      RPC_QUEUE_NAME,
      Buffer.from(JSON.stringify(requestPayload)),
      {
        replyTo: q.queue,
        correlationId: uuid,
      }
    );

    return new Promise((resolve, reject) => {
      // timeout n
      const timeout = setTimeout(() => {
        channel.close();
        resolve("API could not fullfil the request!");
      }, 8000);
      channel.consume(
        q.queue,
        (msg) => {
          if (msg.properties.correlationId == uuid) {
            resolve(JSON.parse(msg.content.toString()));
            clearTimeout(timeout);
          } else {
            reject("data Not found!");
          }
        },
        {
          noAck: true,
        }
      );
    });
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports.RPCRequest = async (RPC_QUEUE_NAME, requestPayload) => {
  const uuid = uuid4(); // correlationId
  return await requestData(RPC_QUEUE_NAME, requestPayload, uuid);
};