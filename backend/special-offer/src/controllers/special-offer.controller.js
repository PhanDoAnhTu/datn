
"use strict";

const SpecialOfferService = require('../services/special-offer.service');
const { successResponse } = require('../core');
class SpecialOfferController {
    constructor() {
        this.service = new SpecialOfferService()
    }
    createSpecialOffer=async(req, res, next)=>{
        new successResponse.SuccessResponse({
            message: 'createSpecialOffer success',
            metaData: await this.service.createSpecialOffer(req.body)
        }).send(res)

    }
    getSpecialOfferBySpuId=async(req, res, next)=>{
        new successResponse.SuccessResponse({
            message: 'getSpecialOfferBySpuId success',
            metaData: await this.service.getSpecialOfferBySpuId(req.body)
        }).send(res)

    }
}

module.exports = new SpecialOfferController()