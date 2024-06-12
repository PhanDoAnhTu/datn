
"use strict";

const CartService = require('../services/cart.service');
const { successResponse } = require('../core');
class CartController {
    constructor() {
        this.service = new CartService()
    }
    addToCart = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "created new cart success",
            metaData: await this.service.addToCart(req.body)
        }).send(res)
    }

    updateSkuFromCart = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "updateSkuFromCart cart success",
            metaData: await this.service.updateSkuFromCart(req.body)
        }).send(res)
    }

    updateQuantityFromCart = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "updateQuantityFromCart cart success",
            metaData: await this.service.updateQuantityFromCart(req.body)
        }).send(res)
    }
    updateSkuFromCartV2 = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "updateSkuFromCartV2 cart success",
            metaData: await this.service.updateSkuFromCartV2(req.body)
        }).send(res)
    }

    deleteToCartItem = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "deleted cart item success",
            metaData: await this.service.deleteToCartItem(req.body)
        }).send(res)
    }

    deleteToCartByCartIdAndUserId = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "deleted cart success",
            metaData: await this.service.deleteToCartByCartIdAndUserId(req.body)
        }).send(res)
    }

    findUserCart = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "get list cart success",
            metaData: await this.service.findUserCart(req.body)
        }).send(res)
    }


}

module.exports = new CartController()