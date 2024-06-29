
"use strict";

const StaffService = require('../services/staff.service');
const { successResponse } = require('../core');
class StaffController {
    constructor() {
        this.service = new StaffService();
      }
    login = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "login success",
            metaData: await this.service.login(req.body),
        }).send(res);
    };

    logout = async (req, res, next) => {
        // console.log("req.keyStore:", req.keyStore);
        return new successResponse.SuccessResponse({
            message: "logout success",
            metaData: await this.service.logout(req.keyStore),
        }).send(res);
    };

}

module.exports = new StaffController