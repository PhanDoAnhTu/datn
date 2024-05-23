
"use strict";

const DiscountService = require('../services/discount.service');
const { successResponse } = require('../core');
class DiscountController {
    constructor() {
        this.service = new DiscountService()
    }
    createDiscount = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "created new discount success",
            metaData: await this.service.createDiscountCode(req.body)
        }).send(res)
    }
    discountAmount = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "get discount amount success",
            metaData: await this.service.getDiscountAmount(req.body)
        }).send(res)
    }
}

module.exports = new DiscountController()