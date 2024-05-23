
"use strict";

const orderService = require('../services/order.service');
const { successResponse } = require('../core');
class OrderController {
    constructor() {
        this.service = new orderService()
    }

    checkoutReview = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "created new order success",
            metaData: await this.service.checkoutReview(req.body)
        }).send(res)
    }



}

module.exports = new OrderController()