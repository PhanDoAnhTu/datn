'use strict'

const { ApiKeyModel } = require("../database/models")
const crypto = require('crypto');

const findById = async (key) => {
    //   const newKey=await ApiKeyModel.create({key:crypto.randomBytes(64).toString('hex'),permission:['0000']})
    //   console.log(newKey)
    const objKey = await ApiKeyModel.findOne({ key, status: true}).lean()
    console.log(objKey)
    return objKey
}

module.exports = {
    findById
}