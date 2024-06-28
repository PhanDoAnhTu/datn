
"use strict";

const SpecialOfferService = require('../services/special-offer.service');
const { successResponse } = require('../core');
class SpecialOfferController {
    constructor() {
        this.service = new SpecialOfferService()
    }
    createSpecialOffer = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'createSpecialOffer success',
            metaData: await this.service.createSpecialOffer(req.body)
        }).send(res)

    }
    findSpecialOfferBySpuId = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'getSpecialOfferBySpuId success',
            metaData: await this.service.findSpecialOfferBySpuId(req.body)
        }).send(res)

    }
    findSpecialOfferBetweenStartDateAndEndByDate = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'getSpecialOfferToday success',
            metaData: await this.service.findSpecialOfferBetweenStartDateAndEndByDate(req.body)
        }).send(res)

    }
    getAllSpecialOffer = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'getAllSpecialOffer success',
            metaData: await this.service.getAllSpecialOffer()
        }).send(res)
    }
    onChangeStatusSpecialOfferById = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'onChangeStatusSpecialOfferById success',
            metaData: await this.service.onChangeStatusSpecialOfferById(req.body)
        }).send(res)
    }
    removeSpecialOfferById = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'removeSpecialOfferById success',
            metaData: await this.service.removeSpecialOfferById(req.body)
        }).send(res)
    }
    isTrashPromotion = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'isTrashPromotion success',
            metaData: await this.service.isTrashPromotion(req.body)
        }).send(res)
    }
    applyPromotion = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'applyPromotion success',
            metaData: await this.service.applyPromotion(req.body)
        }).send(res)
    }
}

module.exports = new SpecialOfferController()