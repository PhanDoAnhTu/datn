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
      feeShip: 0, //phi ship
      totalSpecialOffer: 0, //tong promotion
      totalDiscount: 0, //tong discount
      totalCheckout: 0, //tong thanh toan
    };

    const { shop_discounts = [], item_products = [] } = order_ids;

    // console.log("item_products:  ", item_products)
    //checkout product available

    const checkProductServer = await RPCRequest("SPU_RPC", {
      type: "CHECK_PRODUCT_BY_SERVER",
      data: {
        products: item_products,
      },
    });
    console.log('checkProductServer', checkProductServer)
    if (!checkProductServer[0])
      throw new errorResponse.BadRequestError("order wrong");
    //tong don hang

    const checkoutPrice = checkProductServer.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);
    //tong tien truoc khi xuly
    checkout_oder.totalPrice = checkoutPrice;
    const itemCheckout = {
      shop_discounts,
      shop_promotion: null,//hmmmm
      priceRaw: checkoutPrice, //tien truoc khi giam gia
      priceApplySpecialOffer: checkoutPrice,
      priceApplyPromotionAndDiscount: checkoutPrice,
      item_products: checkProductServer,
    };
    let checkProductServerSpecialOffer = [];
    const checkDateNow = await RPCRequest("SPECIAL_OFFER_RPC", {
      type: "FIND_SPECIAL_OFFER_BY_DATE",
      data: {
        special_offer_is_active: true,
        date: Date.now(),
      },
    });
    // console.log("checkDateNow", checkDateNow)
    if (checkDateNow) {
      checkProductServer.forEach((prod) => {
        const spu_in_sale = checkDateNow.special_offer_spu_list.find(
          (spu) => spu.product_id == prod.productId
        );
        if (spu_in_sale) {
          checkDateNow.special_offer_spu_list?.find((spu_sale) => {
            if (spu_sale.product_id == prod.productId && prod.sku_id === null) {
              checkProductServerSpecialOffer.push({
                ...prod,
                price_sale: spu_sale.price_sale,
              });
              return;
            }
            if (spu_sale.product_id == prod.productId && prod.sku_id !== null && spu_sale.sku_list.length > 0) {
              const sku_sale = spu_sale.sku_list.find(
                (sku) => sku.sku_id == prod.sku_id
              );

              if (sku_sale) {
                checkProductServerSpecialOffer.push({
                  ...prod,
                  price_sale: sku_sale.price_sale,
                });
                return;
              }
            }
          });
        } else {
          checkProductServerSpecialOffer.push(prod);
        }
      });
    }
    // console.log(checkProductServerSpecialOffer)
    itemCheckout.priceApplySpecialOffer = checkProductServerSpecialOffer.reduce(
      (acc, product) => {
        return (
          acc +
          product.quantity *
          (product.price_sale ? product.price_sale : product.price)
        );
      },
      0
    );
    checkout_oder.totalSpecialOffer =
      itemCheckout.priceRaw - itemCheckout.priceApplySpecialOffer;

    if (shop_discounts.length > 0) {
      const { discount = 0 } = await RPCRequest("DISCOUNT_RPC", {
        type: "GET_DISCOUNT_AMOUNT",
        data: {
          codeId: shop_discounts[0].codeId,
          userId,
          products:
            checkProductServerSpecialOffer.length > 0
              ? checkProductServerSpecialOffer
              : checkProductServer,
        },
      });
      //tong discount
      checkout_oder.totalDiscount = discount;
      //neu tien giam gia >0
      itemCheckout.priceApplyPromotionAndDiscount =
        itemCheckout.priceRaw - checkout_oder.totalSpecialOffer - discount;
    }
    if (checkProductServerSpecialOffer.length > 0) {
      itemCheckout.item_products = checkProductServerSpecialOffer;
    }
    if (checkout_oder.totalSpecialOffer > 0) {
      itemCheckout.shop_promotion = checkDateNow?._id
    }


    //tong thanh toan
    checkout_oder.totalCheckout =
      checkout_oder.totalPrice -
      checkout_oder.totalSpecialOffer -
      checkout_oder.totalDiscount;

    return {
      order_ids,
      order_ids_new: itemCheckout,
      checkout_oder,
    };
  }

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

    // if (order_ids_new.item_products.length > 0) {
    //   const updateProduct = await RPCRequest("SPU_RPC", {
    //     type: "UPDATE_QUANTITY_AFTER_CHECKOUT",
    //     data: {
    //       item_products: order_ids_new.item_products
    //     },
    //   });
    // }

    // if (order_ids_new.shop_promotion) {
    //   const updatePromotion = await RPCRequest("SPECIAL_OFFER_RPC", {
    //     type: "APPLY_PROMOTION",
    //     data: {
    //       promotion_id: order_ids_new.shop_promotion,
    //       item_products: order_ids_new.item_products.filter((item) => item.price_sale)
    //     },
    //   });
    // }
    // if (order_ids_new.shop_discounts.length > 0) {
    //   const updateDiscount = await RPCRequest("DISCOUNT_RPC", {
    //     type: "APPLY_DISCOUNT_CODE",
    //     data: {
    //       discount_code: order_ids_new.shop_discounts[0].codeId,
    //       userId: userId
    //     },
    //   });
    // }

    return newOrder;
  }

  async changeStatusOrderByOrderId({ order_id, order_status }) {
    if (
      [
        "pending",
        "confirmed",
        "shipping",
        "cancelled",
        "successful",
        "review",
      ].includes(order_status) == false
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
    const foundOrder = await OrderModel.find({ order_status }).lean();
    return foundOrder;
  }
  async findOrderByStatusAndAroundDay({ order_status, numberDay }) {
    let today = new Date();
    let old_day = get_old_day_of_time(numberDay, today);

    console.log(today, old_day)
    const foundOrder = await OrderModel.find({
      order_status: { $in: order_status },
      modifiedOn: {
        $gte: old_day,
      }
    }).lean();
    return foundOrder;
  }

  async getAllOrder() {
    const foundOrder = await OrderModel.find().lean();
    return foundOrder;
  }

  async serverRPCRequest(payload) {
    const { type, data } = payload;
    const { order_status, numberDay } = data;
    switch (type) {
      case "FIND_ORDER_BY_STATUS":
        return this.findOrderByStatus({ order_status });
      case "FIND_ORDER_BY_STATUS_AND_AROUND_DAY":
        return this.findOrderByStatusAndAroundDay({ order_status, numberDay });
      default:
        break;
    }
  }
}

module.exports = CheckoutService;
