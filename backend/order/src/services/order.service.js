"use strict";
const { errorResponse } = require("../core");
// const { acquireLock, releaseLock } = require('./redis.service')
const { OrderModel } = require("../database/models");
const { RPCRequest, get_old_day_of_time } = require("../utils");
const { v4: uuidv4 } = require("uuid");

class CheckoutService {

  async checkoutReview({ cartId, userId, order_ids }) {

    // const foundCart = await findCartById(cartId)

    // if (!foundCart) {
    //     throw new BadRequestError('cart does not exists!')
    // }
    const checkout_oder = {
      totalPrice: 0,
      feeShip: 0,//phi ship
      totalSpecialOffer: 0,//tong discount
      totalDiscount: 0,//tong discount
      totalCheckout: 0,//tong thanh toan
    }

    const { shop_discounts = [], item_products = [] } = order_ids

    console.log("item_products:  ", item_products)
    //checkout product available

    const checkProductServer = await RPCRequest("SPU_RPC", {
      type: "CHECK_PRODUCT_BY_SERVER",
      data: {
        products: item_products
      }
    })
    console.log('checkProductServer', checkProductServer)
    if (!checkProductServer[0]) throw new errorResponse.BadRequestError('order wrong')
    //tong don hang

    const checkoutPrice = checkProductServer.reduce((acc, product) => {
      return acc + (product.quantity * product.price)
    }, 0)
    //tong tien truoc khi xuly
    checkout_oder.totalPrice = + checkoutPrice
    const itemCheckout = {
      shop_discounts,//hmmmm
      priceRaw: checkoutPrice,//tien truoc khi giam gia
      priceApplySpecialOffer: checkoutPrice,
      priceApplyDiscount: checkoutPrice,
      item_products: checkProductServer
    }
    let checkProductServerSpecialOffer = []
    const checkDateNow = await RPCRequest("SPECIAL_OFFER_RPC", {
      type: "FIND_SPECIAL_OFFER_BY_DATE",
      data: {
        special_offer_is_active: true,
        date: Date.now(),
      },
    });
    if (checkDateNow) {
      checkDateNow.special_offer_spu_list?.map((spu) => {
        if (spu.sku_list.length > 0) {
          return spu.sku_list.map((sku) => {
            return checkProductServer.find((prod) => {
              if (prod.sku_id == sku.sku_id) {
                const { price, ...prodNoPrice } = prod
                checkProductServerSpecialOffer.push({ ...prodNoPrice, price: sku.price_sale })
                return
              }
            })
          })
        }
        return checkProductServer.find((prod) => {
          if (!prod.sku_id & prod.productId == spu.product_id) {
            const { price, ...prodNoPrice } = prod
            checkProductServerSpecialOffer.push({ ...prodNoPrice, price: spu.price_sale })
            return
          }
        })
      })
    }
    itemCheckout.priceApplySpecialOffer = checkProductServerSpecialOffer.reduce((acc, product) => {
      return acc + (product.quantity * product.price)
    }, 0)

    if (shop_discounts.length > 0) {
      const { discount = 0 } = await RPCRequest("DISCOUNT_RPC", {
        type: "GET_DISCOUNT_AMOUNT",
        data: {
          codeId: shop_discounts[0].codeId,
          userId,
          products: checkProductServerSpecialOffer,
        },
      });
      //tong discount 
      checkout_oder.totalDiscount += discount
      //neu tien giam gia >0
      if (discount > 0) {

        itemCheckout.priceApplyDiscount = checkoutPrice - discount
      }
    }
    checkout_oder.totalSpecialOffer = itemCheckout.priceApplySpecialOffer
    //tong thanh toan
    checkout_oder.totalCheckout += (itemCheckout.priceApplySpecialOffer - checkout_oder.totalDiscount)
    // order_ids_new.push(itemCheckout)

    return {
      order_ids,
      order_ids_new: itemCheckout,
      checkout_oder
    }
  }

  // async checkoutReview({ cartId, userId, order_ids }) {
  //   /////check cart
  //   // const foundCart = await RPCRequest("CART_RPC", {
  //   //     type: "GET_CART_BY_ID",
  //   //     data: {
  //   //         cartId: cartId
  //   //     }
  //   // })
  //   // if (!foundCart) {
  //   //     throw new errorResponse.BadRequestError('cart does not exists!')
  //   // }
  //   const checkout_oder = {
  //     totalPrice: 0,
  //     feeShip: 0, //phi ship
  //     totalDiscount: 0, //tong discount
  //     totalCheckout: 0, //tong thanh toan
  //   }
  //   const { shop_discounts = [], item_products = [] } = order_ids;

  //   console.log("item_products:  ", item_products);
  //   //checkout product available
  //   // const checkProductServer = await RPCRequest("SPU_RPC", {
  //   //     type: "CHECK_PRODUCT_BY_SERVER",
  //   //     data: {
  //   //         products: item_products
  //   //     }
  //   // })
  //   // console.log('checkProductServer', checkProductServer)
  //   // if (!checkProductServer[0]) throw new errorResponse.BadRequestError('order wrong')
  //   //tong don hang
  //   const checkoutPrice = item_products.reduce((acc, product) => {
  //     return acc + product.quantity * product.price;
  //   }, 0);
  //   //tong tien truoc khi xuly
  //   checkout_oder.totalPrice = +checkoutPrice;

  //   const itemCheckout = {
  //     shop_discounts, //hmmmm
  //     priceRaw: checkoutPrice, //tien truoc khi giam gia
  //     priceApplyDiscount: checkoutPrice,
  //     item_products: item_products, //checkProductServer
  //   };
  //   if (shop_discounts.length > 0) {
  //     const { discount = 0 } = await RPCRequest("DISCOUNT_RPC", {
  //       type: "GET_DISCOUNT_AMOUNT",
  //       data: {
  //         codeId: shop_discounts[0].codeId,
  //         userId,
  //         products: item_products,
  //       },
  //     });

  //     //tong discount
  //     checkout_oder.totalDiscount += discount;
  //     //neu tien giam gia >0
  //     if (discount > 0) {
  //       itemCheckout.priceApplyDiscount = checkoutPrice - discount;
  //     }
  //   }
  //   //tong thanh toan
  //   checkout_oder.totalCheckout += itemCheckout.priceApplyDiscount;

  //   return {
  //     order_ids,
  //     order_ids_new: itemCheckout,
  //     checkout_oder,
  //   };
  // }

  async orderByUser({
    order_ids,
    cartId,
    userId,
    order_shipping = {},
    user_payment = {},
  }) {
    const { order_ids_new, checkout_oder } = await this.checkoutReview({
      cartId,
      userId,
      order_ids,
    });
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
    const order_trackingNumber = `${uuidv4()}`;

    const newOrder = await OrderModel.create({
      order_userId: userId,
      order_checkout: checkout_oder,
      order_shipping: order_shipping,
      order_product: order_ids_new,
      order_payment: user_payment,
      order_trackingNumber: order_trackingNumber,
    });
    //neu them thanh cong remove pro co trong gio hanag
    // if(){

    // }
    return newOrder;
  }



  async changeStatusOrderByOrderId({ order_id, order_status }) {
    if (
      ["pending", "confirmed", "shipped", "cancelled"].includes(order_status) ==
      false
    )
      throw new errorResponse.BadRequestError("status not exitsts");

    const query = { _id: order_id };
    const updateOrInsert = {
      $set: {
        order_status: order_status,
      },
    },
      options = {
        upsert: true,
        new: true,
      };
    return await OrderModel.findOneAndUpdate(query, updateOrInsert, options);
  }

  async findOrderByUserId({ order_userId }) {
    try {
      const foundOrder = await OrderModel.find({
        order_userId,
      });
      return foundOrder;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findOrderByTrackingNumber({ order_trackingNumber }) {
    const foundOrder = await OrderModel.findOne({ order_trackingNumber });
    if (!foundOrder)
      throw new errorResponse.BadRequestError("order not exitsts");

    return foundOrder;
  }



  async findOrderByStatus({ order_status }) {
    const foundOrder = await OrderModel.find({ order_status });
    return foundOrder;
  }
  async findOrderByStatusAndAroundDay({ order_status, numberDay }) {
    let today = new Date();
    let old_day = get_old_day_of_time(numberDay, today)
    const foundOrder = await OrderModel.find({
      order_status, modifiedOn: {
        $lte: old_day
      }
    });
    return foundOrder;
  }

  async getAllOrder() {
    const foundOrder = await OrderModel.find();
    return foundOrder;
  }


  async serverRPCRequest(payload) {
    const { type, data } = payload;
    const { order_status, numberDay } = data;
    switch (type) {
      case "FIND_ORDER_BY_STATUS":
        return this.findOrderByStatus({ order_status });
      case "FIND_ORDER_BY_STATUS_AND_AROUND_DAY":
        return this.findOrderByStatus({ order_status, numberDay });

      default:
        break;
    }
  };

}

module.exports = CheckoutService;
