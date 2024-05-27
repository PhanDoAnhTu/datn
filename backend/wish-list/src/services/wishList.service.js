'use strict';

const { errorResponse } = require("../core");
const { WishListModel } = require("../database/models");
const { wishListRepository } = require("../database");
const { Types } = require("mongoose");


class WishListService {

    async createUserWishList({ userId, productId }) {
        const query = { wish_list_userId: userId, wish_list_state: 'active' }
        const updateOrInsert = {
            $addToSet: {
                wish_list_products: productId
            }
        }, options = {
            upsert: true,
            new: true
        }
        return await WishListModel.findOneAndUpdate(query, updateOrInsert, options).lean()
    }


    async addToWishList({ userId, productId = "" }) {

        const userWishList = await WishListModel.findOne({ wish_list_userId: userId })
        if (!userWishList) {
            return await this.createUserWishList({ userId, productId })
        }

        if (!userWishList.wish_list_products.length) {
            userWishList.wish_list_products = [productId]
            return await userWishList.save()
        }
        let hasProduct = await userWishList.wish_list_products.find((proId) => {
            return proId === productId
        })
        if (hasProduct) {
            return { message: "The product already exists in the list" }
        }
        userWishList.wish_list_products = [...userWishList.wish_list_products, productId]
        return await userWishList.save()

    }


    async deleteToWishListItem({ userId, productId }) {
        const query = {
            wish_list_userId: userId,
            wish_list_state: 'active'
        }, updateSet = {
            $pull: {
                wish_list_products: productId
            }
        }
        return await WishListModel.updateOne(query, updateSet).lean()
    }

    async getUserWishList({ userId }) {
        return await WishListModel.findOne({ wish_list_userId: userId }).lean()
    }

    async deleteToWishListByUserId({userId }) {
        return await WishListModel.deleteOne({ wish_list_userId: userId }).lean()
    }
    // async serverRPCRequest(payload) {
    //     const { type, data } = payload;
    //     const { } = data
    //     switch (type) {
    //         case "":
    //         default:
    //             break;
    //     }
    // }
}

module.exports = WishListService