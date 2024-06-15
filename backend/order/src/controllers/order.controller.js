"use strict";

const orderService = require("../services/order.service");
const { successResponse } = require("../core");
class OrderController {
  constructor() {
    this.service = new orderService();
  }

  checkoutReview = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "created checkout review success",
      metaData: await this.service.checkoutReview(req.body),
    }).send(res);
  };

  createOrder = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "created new order success",
      metaData: await this.service.orderByUser(req.body),
    }).send(res);
  };
  changeStatusOrderByOrderId = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "change status order success",
      metaData: await this.service.changeStatusOrderByOrderId(req.body),
    }).send(res);
  };
  findOrderByUserId = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getOrderByUserId success",
      metaData: await this.service.findOrderByUserId(req.body),
    }).send(res);
  };
}

module.exports = new OrderController();
