const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const _ = require('lodash')
const { v4: uuid4 } = require("uuid");
const {
  APP_SECRET,
  EXCHANGE_NAME,
  SERVICE,
  MSG_QUEUE_URL,
} = require("../config");
const { Types } = require("mongoose");

let amqplibConnection = null;
//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.convertToObjectIdMongodb = async (id) => {
  return await Types.ObjectId(id)
}

module.exports.getIntoData = async ({ fileds = [], object = {} }) => {

  return _.pick(object, fileds)
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: "2d"
    })
    const refreshToken = await jwt.sign(payload, privateKey, {
      expiresIn: "7d"
    })
    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("err verify:  ", err)
      } else {
        console.log("decode:  ", decode)
      }
    })

    return { accessToken, refreshToken }
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports.ValidateSignature = async (req) => {
  try {
    if (process.env.NODE_ENV == "dev") {
      const signature = req.cookies.jwt;
      console.log("signature_dev: ", signature);
      const payload = await jwt.verify(signature, APP_SECRET);
      req.user = payload;

    } else {
      const signature = req.get("Authorization");
      console.log("signature: ", signature);
      const payload = await jwt.verify(signature, APP_SECRET);
      req.user = payload;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.replacePlaceholder = (template, params) => {
  Object.keys(params).forEach(k => {
    const placeholder = `{{${k}}}` ///{{verify key}}
    template = template.replace(new RegExp(placeholder, 'g'), params[k])
  })
  return template
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

module.exports.PublishMessage = (channel, service, msg) => {
  channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
  console.log("Sent: ", msg);
};

module.exports.SubscribeMessage = async (channel, service) => {
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
  const q = await channel.assertQueue("", { exclusive: true });
  console.log(` Waiting for messages in queue: ${q.queue}`);

  channel.bindQueue(q.queue, EXCHANGE_NAME, SERVICE);

  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        console.log("the message is:", msg.content.toString());
        service.SubscribeEvents(msg.content.toString());
      }
      console.log("[X] received");
    },
    {
      noAck: true,
    }
  );
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
        console.log(payload)
        const response = await service.serverRPCRequest(payload);
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