"use strict";
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const { OtpModel } = require('../database/models');
const { errorResponse } = require('../core');


const generatorTokenRandom = async ({ payload, key }) => {
    // const token = crypto.randomInt(0, Math.pow(2, 32))
    // const token = await Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    try {
        console.log('payload: ', payload)

        const token = await jwt.sign(payload, key, {
            expiresIn: 120
        })
        jwt.verify(token, key, (err, decode) => {
            if (err) {
                console.log("err verify:  ", err)
            } else {
                console.log("decode:  ", decode)
            }
        })

        return token
    } catch (error) {
        console.log(error);
        return error;
    }
}

const newOtp = async ({ user_email, user_name , user_password }) => {
    const key = await crypto.randomBytes(64).toString('hex')
    const token = await generatorTokenRandom({ payload: { user_email, user_name, user_password }, key });
    const newToken = await OtpModel.create({
        otp_token: token,
        otp_email: user_email,
        otp_key: key
    })
    return newToken
}

const checkEmailToken = async ({ token }) => {
    const foundToken = await OtpModel.findOne({ otp_token: token }).lean()

    if (!foundToken) throw new errorResponse.NotFoundRequestError("token not found")
    const deleteOtp = await OtpModel.deleteOne({ otp_token: token }).lean()
    // console.log("foundToken", deleteOtp)
    return foundToken
}

const checkEmailOtp = async ({ otp }) => {
    const foundToken = await OtpModel.findOne({ otp_key: otp }).lean()

    if (!foundToken) throw new errorResponse.NotFoundRequestError("token not found")
    const deleteOtp = await OtpModel.deleteOne({ otp_key: otp }).lean()
    // console.log("foundToken", deleteOtp)otp
    return foundToken
}

module.exports = {
    newOtp,
    checkEmailToken,
    checkEmailOtp
}