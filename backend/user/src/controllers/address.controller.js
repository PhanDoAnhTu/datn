
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
            metaData: await this.service.CreateAddress(req.body)
        }).send(res)
    }

    removeAddress = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "removeAddress",
            metaData: await this.service.removeAddress(req.body)
        }).send(res)
    }

    getAddressByCustomerId = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "getAddressByCustomerId",
            metaData: await this.service.getAddressByCustomerId(req.body)
        }).send(res)
    }
    isDefaultAddress = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "isDefaultAddress",
            metaData: await this.service.isDefaultAddress(req.body)
        }).send(res)
    }
    getAddressByCustomerIdAndIsDefault = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "getAddressByCustomerIdAndIsDefault",
            metaData: await this.service.getAddressByCustomerIdAndIsDefault(req.body)
        }).send(res)
    }
}

module.exports = new AddressController