"use strict";

const { errorResponse, successResponse } = require('../core')
const bcrypt = require('bcrypt')
const { customerRepository } = require('../database');
const { GeneratePassword, GenerateSignature, getIntoData } = require('../utils');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { verifyJWT } = require('../auth/authUtils');
const { sendEmailToken, sendEmailOTP } = require('./email.service');
const { CustomerModel } = require('../database/models');
const { checkEmailToken, newOtp, checkEmailOtp } = require('./otp.service');
const jwt = require("jsonwebtoken");
const _ = require("lodash");

class CustomerService {

    constructor() {
        this.repository = new customerRepository();
    }

    async login({ customer_email, customer_password, refreshToken = null }) {
        const foundCustomer = await this.repository.findByEmail(customer_email)
        if (!foundCustomer) {
            throw new errorResponse.ForbiddenRequestError("auth err")
        }
        const match = await bcrypt.compare(customer_password, foundCustomer.customer_password)
        if (!match) {
            throw new errorResponse.ForbiddenRequestError("auth err not math")
        }
        const publicKey = await crypto.randomBytes(64).toString('hex')
        const privateKey = await crypto.randomBytes(64).toString('hex')

        const tokens = await GenerateSignature({ customerId: foundCustomer._id, customer_email }, publicKey, privateKey)
        await keyTokenService.createKeyToken({ userId: foundCustomer._id, refreshToken: tokens.refreshToken, publicKey, privateKey })
        const customer = await getIntoData({ fileds: ['_id', 'customer_name', 'customer_email', 'customer_phone', 'customer_sex', 'customer_avatar', 'customer_date_of_birth', 'customer_provider'], object: foundCustomer })
        return {
            customer,
            tokens
        }
    }

    async signUp({ customer_email, customer_name, customer_password, captcha = null }) {

        const hodelCustomer = await this.repository.findByEmail(customer_email)
        if (hodelCustomer) {
            return {
                code: 201,
                message: "customer already registered"
            }
        }
        const token = await newOtp({ user_email: customer_email, user_name: customer_name, user_password: customer_password })
        const result = await sendEmailToken({ user_email: customer_email, token })

        return { token: result }
    }

    async logout(keyStore) {
        console.log("keyStore_id", keyStore._id)
        const delKey = await keyTokenService.removeKeyById(keyStore._id)
        return {
            code: 201,
            message: "customer already logout",
            metaData: delKey
        }
    }

    async handlerRefreshToken(refreshToken) {
        const foundToken = await keyTokenService.findByRefreshTokenUsed(refreshToken)
        if (foundToken) {
            console.log({ foundToken })
            const { customerId, customer_email } = await verifyJWT(refreshToken, foundToken.privateKey)
            console.log({ customerId, customer_email })
            await keyTokenService.deleteKeyById(customerId)
            throw new errorResponse.ForbiddenRequestError("Something wrong happen")
        }

        const holderToken = await keyTokenService.findByRefreshToken(refreshToken)
        if (!holderToken) throw new errorResponse.ForbiddenRequestError("customer not registered")
        const { customerId, customer_email } = await verifyJWT(refreshToken, holderToken.privateKey)

        const foundCustomer = await this.repository.findByEmail(customer_email)
        if (!foundCustomer) throw new errorResponse.ForbiddenRequestError("customer not registered 2")
        const tokens = await GenerateSignature({ customerId, customer_email }, holderToken.publicKey, holderToken.privateKey)


        await holderToken.update({
            $set: {
                refreshToken: tokens.refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })
        return {
            customer: { customerId, customer_email },
            tokens
        }
    }
    async checkLoginEmailTokenService({ token }) {
        try {
            const { otp_email: email, otp_token, otp_key } = await checkEmailToken({ token })
            const customerInfo = await jwt.verify(otp_token, otp_key)
            const { user_email, user_name, user_password } = customerInfo
            if (!email || (email !== user_email)) throw new errorResponse.ErrorResponse({ message: "token not found" })

            const hasCustomer = await this.findCustomerByEmail({ customer_email: email })
            if (hasCustomer) throw new errorResponse.ErrorResponse({ message: "email already exists" })


            const passwordHash = await GeneratePassword(user_password, 10)

            const newCustomer = await this.repository.createCustomer({ customer_email: email, customer_name: user_name, customer_password: passwordHash })

            if (newCustomer) {
                const publicKey = await crypto.randomBytes(64).toString('hex')
                const privateKey = await crypto.randomBytes(64).toString('hex')

                const keyStore = await keyTokenService.createKeyToken({ customerId: newCustomer._id, publicKey, privateKey })
                if (!keyStore) {
                    return { code: 403, message: "sign: err keys " }
                }
                //create tokenpair
                const tokens = await GenerateSignature({ customerId: newCustomer._id, customer_email: email }, publicKey, privateKey)
                customer = await getIntoData({ fileds: ['_id', 'customer_name', 'customer_email'], object: newCustomer })

                return {
                    message: "dang-ky-tai-khoan-thanh-cong",
                    customer,
                    tokens
                }
            }

        } catch (error) {
            return error
        }

    }

    async findCustomerByEmail({ customer_email }) {

        const customer = await CustomerModel.findOne({ customer_email }).lean()
        return customer
    }

    async findCustomerById({ customer_id }) {

        const customer = await CustomerModel.findOne({ _id: customer_id }).lean()
        return customer
    }
    async findcustomerByIdAndProvider({ customer_account_id, customer_provider }) {
        return await this.repository.findcustomerByIdAndProvider({ customer_account_id, customer_provider })
    }
    async newCustomerWithSocial({ customer_account_id, customer_provider, customer_email = '', customer_name, customer_avatar = '' }) {
        const hasCustomer = await this.findCustomerByEmail({ customer_email })
        if (hasCustomer) return null

        const newCustomer = await this.repository.createCustomerWithSocial({ customer_account_id, customer_provider, customer_avatar, customer_email, customer_name })

        if (!newCustomer) {
            return null
        }
        return await getIntoData({ fileds: ['_id', 'customer_name', 'customer_email'], object: newCustomer })

    }

    async loginWithSocial({ customer_account_id, customer_provider, refreshToken = null }) {
        try {
            const foundCustomer = await this.findcustomerByIdAndProvider({ customer_account_id, customer_provider })
            if (!foundCustomer) {
                throw new errorResponse.ForbiddenRequestError("auth err")
            }
            const publicKey = await crypto.randomBytes(64).toString('hex')
            const privateKey = await crypto.randomBytes(64).toString('hex')

            const tokens = await GenerateSignature({ customerId: foundCustomer._id, customer_provider }, publicKey, privateKey)
            await keyTokenService.createKeyToken({ userId: foundCustomer._id, refreshToken: tokens.refreshToken, publicKey, privateKey })
            const customer = await getIntoData({ fileds: ['_id', 'customer_name', 'customer_email', 'customer_phone', 'customer_sex', 'customer_avatar', 'customer_date_of_birth', 'customer_provider'], object: foundCustomer })
            return {
                customer,
                tokens
            }
        } catch (error) {
            return null
        }
    }
    async changeAvatar({ customer_id, image }) {
        const updateInfo = await CustomerModel.findOneAndUpdate({ _id: customer_id }, {
            $set: {
                customer_avatar: image
            }
        }, { upsert: true, new: true })

        return { customer: updateInfo }
    }

    async changePassword({ customer_email, customer_password }) {
        const passwordHash = await GeneratePassword(customer_password, 10)

        const updateInfo = await CustomerModel.findOneAndUpdate({ customer_email: customer_email }, {
            $set: {
                customer_password: passwordHash
            }
        }, { upsert: true, new: true })

        return updateInfo

    }

    async verifyOtp({ otp }) {

        const { otp_token, otp_key } = await checkEmailOtp({ otp })
        const { user_email, user_password } = await jwt.verify(otp_token, otp_key)

        const updatePassword = await this.changePassword({ customer_email: user_email, user_password })

        return updatePassword
    }

    async checkPassword({ customer_email, customer_password }) {

        const foundCustomer = await this.repository.findByEmail(customer_email)
        if (!foundCustomer) {
            throw new errorResponse.ForbiddenRequestError("auth err")
        }
        const match = await bcrypt.compare(customer_password, foundCustomer.customer_password)
        if (!match) {
            throw new errorResponse.ForbiddenRequestError("auth err not math")
        }
        console.log(customer_email, customer_password, match, "ssssssssssssssss")
        return true
    }



    async resetPassword({ customer_email, customer_password }) {

        const hodelCustomer = await this.repository.findByEmail(customer_email)
        if (!hodelCustomer) {
            throw new errorResponse.NotFoundRequestError("customer not found")
        }
        const otp = await newOtp({ user_email: hodelCustomer.customer_email, user_name: hodelCustomer.customer_name, user_password: customer_password })
        const result = await sendEmailOTP({ user_email: customer_email, otp })

        return result
    }

    async updateInfomation({
        customer_id,
        customer_name,
        customer_phone,
        customer_sex,
        customer_date_of_birth
    }) {

        const query = {
            _id: customer_id,

        }, updateSet = {
            $set: {
                customer_name: customer_name,
                customer_phone: customer_phone,
                customer_sex: customer_sex,
                customer_date_of_birth: customer_date_of_birth
            }
        }, options = {
            upsert: true,
            new: true
        }
        const cus = await CustomerModel.findOneAndUpdate(query, updateSet, options)
        return { customer: cus }
    }

    async getNameAndAvatarCustomer() {

        const foundCustomer = await CustomerModel.find().lean()
        return foundCustomer
    }

    async serverRPCRequest(payload) {
        const { type, data } = payload;
        const { customer_account_id, customer_provider, customer_name, customer_email, customer_avatar, customer_id } = data
        switch (type) {
            case "FIND_CUSTOMER_BY_ID_AND_PROVIDER":
                if (customer_email) {

                    const foundCustomer = await this.findCustomerByEmail({ customer_email })
                    console.log("email:", foundCustomer)
                    if (foundCustomer) return foundCustomer
                }
                return await this.findcustomerByIdAndProvider({ customer_account_id, customer_provider });
            case "NEW_CUSTOMER_WITH_SOCIAL":
                return await this.newCustomerWithSocial({ customer_account_id, customer_provider, customer_email, customer_name, customer_avatar });
            case "LOGIN_WITH_SOCIAL":
                return await this.loginWithSocial({ customer_account_id, customer_provider });
            case "FIND_CUSTOMER_BY_ID":
                return await this.findCustomerById({ customer_id });
            default:
                break;
        }
    }

}

module.exports = CustomerService
