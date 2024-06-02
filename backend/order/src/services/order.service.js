'use strict'
const { errorResponse } = require('../core')
// const { acquireLock, releaseLock } = require('./redis.service')
const { OrderModel } = require('../database/models')
const { RPCRequest } = require('../utils')
const { v4: uuidv4 } = require('uuid');

class CheckoutService {
    async checkoutReview({ cartId, userId, order_ids }) {
        /////check cart
        // const foundCart = await RPCRequest("CART_RPC", {
        //     type: "GET_CART_BY_ID",
        //     data: {
        //         cartId: cartId
        //     }
        // })
        // if (!foundCart) {
        //     throw new errorResponse.BadRequestError('cart does not exists!')
        // }
        const checkout_oder = {
            totalPrice: 0,
            feeShip: 0,//phi ship
            totalDiscount: 0,//tong discount
            totalCheckout: 0,//tong thanh toan
        }, order_ids_new = {
            itemCheckout: {}
        }
        const { shop_discounts = [], item_products = [] } = order_ids

        console.log("item_products:  ", item_products)
        //checkout product available
        // const checkProductServer = await RPCRequest("SPU_RPC", {
        //     type: "CHECK_PRODUCT_BY_SERVER",
        //     data: {
        //         products: item_products
        //     }
        // })
        // const checkProductServer = await checkProductByServer(item_products)
        // console.log('checkProductServer', checkProductServer)
        // if (!checkProductServer[0]) throw new errorResponse.BadRequestError('order wrong')
        //tong don hang
        const checkoutPrice = item_products.reduce((acc, product) => {
            return acc + (product.quantity * product.price)
        }, 0)
        //tong tien truoc khi xuly
        checkout_oder.totalPrice = + checkoutPrice

        const itemCheckout = {
            shop_discounts,//hmmmm
            priceRaw: checkoutPrice,//tien truoc khi giam gia
            priceApplyDiscount: checkoutPrice,
            item_products: item_products
        }
        if (shop_discounts.length > 0) {
            const { discount = 0 } = await RPCRequest("DISCOUNT_RPC", {
                type: "GET_DISCOUNT_AMOUNT",
                data: {
                    codeId: shop_discounts[0].codeId,
                    userId,
                    products: item_products
                }
            })

            //tong discount 
            checkout_oder.totalDiscount += discount
            //neu tien giam gia >0
            if (discount > 0) {
                itemCheckout.priceApplyDiscount = checkoutPrice - discount
            }
        }
        //tong thanh toan
        checkout_oder.totalCheckout += itemCheckout.priceApplyDiscount
        order_ids_new.itemCheckout = itemCheckout

        return {
            order_ids,
            order_ids_new,
            checkout_oder
        }
    }

    async orderByUser({
        order_ids,
        cartId,
        userId,
        order_shipping = {},
        user_payment = {}
    }) {
        const { order_ids_new, checkout_oder } = await this.checkoutReview({
            cartId, userId, order_ids
        })
        //check lai xem co vuot ton kho hay k
        //get new array product
        // const products = order_ids_new.itemCheckout.item_products
        // console.log(products)
        // const acquireProduct = []
        // //optimistic locks
        // for (let i = 0; i < products.length; i++) {
        //     const { productId, quantity } = products[i];
        //     const keyLock = await acquireLock(productId, quantity, cartId)
        //     acquireProduct.push(keyLock ? true : false)
        //     console.log(keyLock)
        //     if (keyLock) {
        //         await releaseLock(keyLock)
        //     }
        // }

        // //check
        // if (acquireProduct.includes(false)) {
        //     throw new errorResponse.BadRequestError('mot so sp da duoc cap nhat ...')
        // }
        const order_trackingNumber = `#${uuidv4()}`

        const newOrder = await OrderModel.create({
            order_userId: userId,
            order_checkout: checkout_oder,
            order_shipping: order_shipping,
            order_product: order_ids_new,
            order_payment: user_payment,
            order_trackingNumber: order_trackingNumber
        })
        //neu them thanh cong remove pro co trong gio hanag
        // if(){

        // }
        return newOrder
    }
    async changeStatusOrderByOrderId({
        order_id,
        order_status
    }) {

        if (['pending', 'confirmed', 'shipped', 'cancelled'].includes(order_status) == false) throw new errorResponse.BadRequestError('status not exitsts')
            
        const query = { _id: order_id }
        const updateOrInsert = {
            $set: {
                order_status: order_status
            }
        }, options = {
            upsert: true,
            new: true
        }
        return await OrderModel.findOneAndUpdate(query, updateOrInsert, options)
    }



}
module.exports = CheckoutService