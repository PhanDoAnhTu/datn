
"use strict";

const WishListService = require('../services/wishList.service');
const { successResponse } = require('../core');
class CartController {
    
    constructor() {
        this.service = new WishListService()
    }
    addToWishList = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "add new wish list success",
            metaData: await this.service.addToWishList(req.body)
        }).send(res)
    }
    getUserWishList = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "get wish list success",
            metaData: await this.service.getUserWishList(req.query)
        }).send(res)
    }
    deleteToWishListByUserId = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "delete wish list success",
            metaData: await this.service.deleteToWishListByUserId(req.body)
        }).send(res)
    }
    deleteToWishListItem = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "delete to wish list item success",
            metaData: await this.service.deleteToWishListItem(req.body)
        }).send(res)
    }
}

module.exports = new CartController()