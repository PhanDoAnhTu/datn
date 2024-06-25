
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
    getAllDiscount = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: " getAllDiscountCodeByShop amount success",
            metaData: await this.service.getAllDiscountCodeByShop(req.body)
        }).send(res)
    }
    findOneDiscount = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: " findOneDiscount  success",
            metaData: await this.service.findOneDiscount(req.body)
        }).send(res)
    }
    changeIsActiveDiscount = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: " changeIsActiveDiscount  success",
            metaData: await this.service.changeIsActiveDiscount(req.body)
        }).send(res)
    }
    isTrashDiscount = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: " isTrashDiscount  success",
            metaData: await this.service.isTrashDiscount(req.body)
        }).send(res)
    }
    deleteDiscountCode = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: " deleteDiscountCode  success",
            metaData: await this.service.deleteDiscountCode(req.body)
        }).send(res)
    }
}

module.exports = new DiscountController()