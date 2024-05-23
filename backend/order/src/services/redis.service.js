'use strict'
const { resolve } = require('path')
const redis = require('redis')
const { promisify } = require('util')
const { RPCRequest } = require('../utils')
const redisClient = redis.createClient()

const pexpire = promisify(redisClient.pExpire).bind(redisClient)
const setnxAsync = promisify(redisClient.setNX).bind(redisClient)

const acquireLock = async (productId, quantity, cartId) => {

    const key = `lock_v_${productId}`
    const retryTimes = 10;
    const expireTime = 3000;
    for (let i = 0; i < retryTimes; i++) {
        const result = await setnxAsync(key, expireTime)
        console.log(`result`, result)
        if (result === 1) {
            //thao tac voi inventory
            const isReservation = await RPCRequest("INVENTORY_RPC", {
                type: "RESERVATION_INVENTORY",
                data: {
                    productId, quantity, cartId
                }
            })

            if (isReservation.modifiedCount) {
                await pexpire(key, expireTime)
                return key

            }
            return null;
        } else {
            await new Promise((resolve) => setTimeout(resolve, 50))
        }

    }



}

const releaseLock = async keyLock => {
    const delAsyncKey = promisify(redisClient.del).bind(redisClient)
    return await delAsyncKey
}
module.exports = {
    releaseLock,
    acquireLock
}