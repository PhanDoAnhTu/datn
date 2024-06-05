'use strict'

const { errorResponse } = require("../core")
const { findById } = require("../services/apiKey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {

        const key = req.headers[HEADER.API_KEY]?.toString()

        if (!key) {
            throw new errorResponse.ForbiddenRequestError("ForbiddenRequestError")
        }
        const objKey = await findById(key)
        if (!objKey) {
            throw new errorResponse.ForbiddenRequestError("ForbiddenRequestError")
        }
        req.objKey = objKey
        return next()
    } catch (error) {
        console.log(error)
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permission) {
            return res.status(403).json({ message: "forbidden err" })
        }
        console.log('permission::::', req.objKey.permission)
        const ValidPerission = req.objKey.permission.includes(permission)
        if (!ValidPerission) {
            return res.status(403).json({ message: "forbidden denied" })

        }
        return next()

    }
}

module.exports = {
    apiKey,
    permission
}