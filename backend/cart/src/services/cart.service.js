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
            // 'cart_products.productId': productId,
            'cart_products.sku_id': sku_id,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, options = {
            upsert: true,
            new: true
        }

        return await CartModel.findOneAndUpdate(query, updateSet, options)
    }
    async updateUserCartSku({ userId, product }) {

        const { productId, sku_id, sku_id_old } = product
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            'cart_products.sku_id': sku_id_old,
            cart_state: 'active'
        }, updateSet = {
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
            userCart.cart_count_product = userCart.cart_count_product + 1
            return await userCart.save()
        }
        let hasProduct = await userCart.cart_products.find((pro) => {
            return pro.productId === product.productId
        })
        if (!hasProduct) {
            userCart.cart_products = [...userCart.cart_products, product]
            userCart.cart_count_product = userCart.cart_count_product + 1
            return await userCart.save()
        }
        let hasSkuId = await userCart.cart_products.find((pro) => {
            return pro.sku_id === product.sku_id
        })
        if (hasProduct && !hasSkuId) {
            userCart.cart_products = [...userCart.cart_products, product]
            userCart.cart_count_product = userCart.cart_count_product + 1
            return await userCart.save()
        }
        return await this.updateUserCartQuantity({ userId, product })
    }

    async addToCartV2({ userId, shop_order_ids = {} }) {
        const { productId, sku_id, quantity, old_quantity, sku_id_old } = shop_order_ids?.item_products
        console.log(sku_id, sku_id_old, quantity, old_quantity)
        // const foundProduct = await RPCRequest("SPU_RPC", {
        //     type: "CHECK_PRODUCT_BY_ID",
        //     data: {
        //         productId: productId
        //     }
        // })
        // console.log("foundProduct", foundProduct)
        // if (!foundProduct) throw new errorResponse.NotFoundRequestError('product do not belong to the shop')
        if (quantity === 0) {

        }
        if (quantity != old_quantity && sku_id == sku_id_old) {
            console.log("aa", quantity - old_quantity)
            return await this.updateUserCartQuantity({
                userId,
                product: {
                    productId,
                    quantity: quantity - old_quantity,
                    sku_id
                }
            })
        }
        const userCart = await CartModel.findOne({ cart_userId: userId })
        if (!userCart) {
            return null
        }
        let hasSkuId = await userCart.cart_products.find((pro) => {
            return pro.sku_id === sku_id
        })
        if (hasSkuId && sku_id != sku_id_old) {
            this.deleteToCartItem({ userId: userId, productId: productId, sku_id: sku_id_old })
            return await this.updateUserCartQuantity({
                userId,
                product: {
                    productId,
                    quantity: quantity,
                    sku_id: hasSkuId.sku_id
                }
            })
            // console.log(hasSkuId)
        }
        if (sku_id != sku_id_old && quantity == old_quantity) {
            return await this.updateUserCartSku({
                userId,
                product: {
                    productId,
                    sku_id,
                    sku_id_old
                }
            })
        }
        if (sku_id == sku_id_old && quantity == old_quantity) {
            return userCart

        }
        return null
    }

    async deleteToCartItem({ userId, productId, sku_id }) {
        const query = {
            cart_userId: userId,
            cart_state: 'active',
        }, updateSet = {
            $pull: {
                cart_products: { sku_id }
            },
            $inc: {
                cart_count_product: -1
            }

        }, options = {
            upsert: true,
            new: true
        }
        return await CartModel.findOneAndUpdate(query, updateSet, options)
    }

    async getUserCart({ userId, cart_state = 'active' }) {
        return await CartModel.findOne({
            cart_userId: userId, cart_state: cart_state
        }).lean()
    }
    async findProductIncartBySkuId({ userId, cart_state = 'active', productId, sku_id }) {
        return await CartModel.findOne({
            cart_userId: userId, cart_state: cart_state, 'cart_products.productId': productId, 'cart_products.sku_id': sku_id
        }).lean()
    }
    async getCartById({ CartId, cart_state = 'active' }) {
        return await CartModel.findOne({
            _id: Types.ObjectId(CartId), cart_state: cart_state
        }).lean()
    }

    async deleteToCartByCartIdAndUserId({ cartId, userId, cart_state = 'active' }) {
        return await CartModel.deleteOne({ _id: Types.ObjectId(cartId), cart_userId: userId, cart_state: cart_state }).lean()
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