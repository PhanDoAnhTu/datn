
const { createClient } = require('redis')


var client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnect',
    ERROR: 'error'
};

const HandleEventConnection = ({
    CONNECT_REDIS
}) => {
    CONNECT_REDIS.on(statusConnectRedis.CONNECT, () => {
        console.log("redis connecting");
    });

    CONNECT_REDIS.on('error', error => {
        console.error(`Redis client error:`, error);
    });
    CONNECT_REDIS.on(statusConnectRedis.END, () => {
        console.log("end")
    })
    CONNECT_REDIS.on(statusConnectRedis.RECONNECT, () => {
        console.log("reconnect")
    })


}

const initRedis = () => {
    const instanceRedis = createClient()
    client.instanceConnect = instanceRedis
    HandleEventConnection({
        CONNECT_REDIS: instanceRedis
    })
}

const getRedis = () => client

module.exports = {
    getRedis,
    initRedis
}