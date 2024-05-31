
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
    updateToCart = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "Updated cart success",
            metaData: await this.service.addToCartV2(req.body)
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
    listToCart = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "get list cart success",
            metaData: await this.service.getUserCart(req.body)
        }).send(res)
    }


}

module.exports = new CartController()