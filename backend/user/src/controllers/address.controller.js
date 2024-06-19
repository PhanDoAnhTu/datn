
"use strict";

const AddressService = require('../services/address.service');
const { successResponse } = require('../core');
class AddressController {
    constructor() {
        this.service = new AddressService();
    }

    CreateAddress = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "CreateAddress",
            metaData: await this.service.CreateAddress({ token })
        }).send(res)
    }

    removeAddress = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "removeAddress",
            metaData: await this.service.removeAddress({ token })
        }).send(res)
    }

    getAddressByCustomerId = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "getAddressByCustomerId",
            metaData: await this.service.getAddressByCustomerId({ token })
        }).send(res)
    }


}

module.exports = new AddressController