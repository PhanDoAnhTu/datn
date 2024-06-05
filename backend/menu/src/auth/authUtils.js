'use strict'
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../core")
const { asynchandler } = require("../helpers/asyncHandlers")
const { findByUserId } = require("../services/keyToken.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'x-client-id'
}

const authentication = asynchandler(async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new errorResponse.ForbiddenRequestError("invalid request")
    const keyStore = await findByUserId(userId)
    if (!keyStore) throw new errorResponse.NotFoundRequestError("not found keyStore")
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new errorResponse.ForbiddenRequestError("invalid request")
    console.log("keyStore", keyStore)
    try {
        const decodeUser = jwt.verify(accessToken, keyStore.publicKey)
        console.log("decodeUser", decodeUser)
        if (decodeUser.staffId) {
            if (userId !== decodeUser.staffId) throw new errorResponse.ForbiddenRequestError("invalid request")
        }
        if (decodeUser.customerId) {
            if (userId !== decodeUser.customerId) throw new errorResponse.ForbiddenRequestError("invalid request")
        } req.keyStore = keyStore

        return next()

    } catch (error) {
        throw error
    }

})

const verifyJWT = async (token, keySecret) => {
    return await jwt.verify(token, keySecret)
}


module.exports = {
    authentication,
    verifyJWT
}