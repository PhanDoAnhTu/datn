
"use strict";

const CustomerService = require('../services/customer.service');
const { successResponse } = require('../core');
class CustomerController {
    constructor() {
        this.service = new CustomerService();
    }
    signUp = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "created success",
            metaData: await this.service.signUp(req.body)
        }).send(res)
    }

    login = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "login success",
            metaData: await this.service.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {
        console.log("req.keyStore:", req.keyStore)
        return new successResponse.SuccessResponse({
            message: "logout success",
            metaData: await this.service.logout(req.keyStore)
        }).send(res)
    }
    handlerRefreshToken = async (req, res, next) => {
        console.log("req.body.refreshToken:", req.body.refreshToken)
        return new successResponse.SuccessResponse({
            message: "get token success",
            metaData: await this.service.handlerRefreshToken(req.body.refreshToken)
        }).send(res)
    }
    checkLoginEmailToken = async (req, res, next) => {
        const { token = null } = req.query

        return new successResponse.SuccessResponse({
            message: "checkLoginEmailTokenService",
            metaData: await this.service.checkLoginEmailTokenService({ token })
        }).send(res)
    }


}

module.exports = new CustomerController