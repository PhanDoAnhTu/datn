'use strict';

const { errorResponse } = require("../core");
const { CartModel } = require("../database/models");
const { cartRepository } = require("../database");
const { Types } = require("mongoose");
const { RPCRequest } = require("../utils");


class cartService {

    async createUserCart({ userId, product }) {
        const query = { cart_userId: userId, cart_state: 'active' }
        const updateOrInsert = {
            $addToSet: {
                cart_products: product
            }
        }, options = {
            upsert: true,
            new: true
        }
        return await CartModel.findOneAndUpdate(query, updateOrInsert, options)
    }

    async updateUserCartQuantity({ userId, product }) {

        const { productId, quantity, sku_id } = product
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            },
            $set: {
                'cart_products.$.sku_id': sku_id
            }
        }, options = {
            upsert: true,
            new: true
        }

        return await CartModel.findOneAndUpdate(query, updateSet, options)
    }

    async addToCart({ userId, product = {} }) {

        const userCart = await CartModel.findOne({ cart_userId: userId })
        if (!userCart) {
            return await this.createUserCart({ userId, product })
        }

        if (!userCart.cart_products.length) {
            userCart.cart_products = [product]
            return await userCart.save()
        }
        let hasProduct = await userCart.cart_products.find((pro) => {
            return pro.productId === product.productId
        })
        if (!hasProduct) {
            userCart.cart_products = [...userCart.cart_products, product]
            return await userCart.save()
        }

        return await this.updateUserCartQuantity({ userId, product })
    }

    async addToCartV2({ userId, shop_order_ids = {} }) {
        const { productId, sku_id, quantity, old_quantity } = shop_order_ids?.item_products

        const foundProduct = await RPCRequest("SPU_RPC", {
            type: "CHECK_PRODUCT_BY_ID",
            data: {
                productId: productId
            }
        })
        if (!foundProduct) throw new errorResponse.NotFoundRequestError('product do not belong to the shop')

        if (quantity === 0) {

        }

        return await this.updateUserCartQuantity({
            userId,
            product: {
                productId,
                quantity: quantity - old_quantity,
                sku_id
            },

        })
    }

    async deleteToCartItem({ userId, productId }) {

        const query = {
            cart_userId: userId,
            cart_state: 'active'
        }, updateSet = {
            $pull: {
                cart_products: { productId }
            }
        }

        return await CartModel.updateOne(query, updateSet)
    }

    async getUserCart({ userId }) {
        return await CartModel.findOne({ cart_userId: userId }).lean()
    }
    async getCartById({ CartId }) {
        return await CartModel.findOne({ _id: Types.ObjectId(CartId) }).lean()
    }

    async deleteToCartByCartIdAndUserId({ cartId, userId }) {
        return await CartModel.deleteOne({ _id: Types.ObjectId(cartId), cart_userId: userId }).lean()
    }
    async serverRPCRequest(payload) {
        const { type, data } = payload;
        const { CartId } = data
        switch (type) {
            case "GET_CART_BY_ID":
                return this.getCartById({ CartId })
            default:
                break;
        }
    }
}

module.exports = cartService