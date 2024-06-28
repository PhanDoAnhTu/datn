"use strict";

const CustomerService = require("../services/customer.service");
const { successResponse } = require("../core");
class CustomerController {
  constructor() {
    this.service = new CustomerService();
  }
  signUp = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "created success",
      metaData: await this.service.signUp(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "login success",
      metaData: await this.service.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    console.log("req.keyStore:", req.keyStore);
    return new successResponse.SuccessResponse({
      message: "logout success",
      metaData: await this.service.logout(req.keyStore),
    }).send(res);
  };
  handlerRefreshToken = async (req, res, next) => {
    console.log("req.body.refreshToken:", req.body.refreshToken);
    return new successResponse.SuccessResponse({
      message: "get token success",
      metaData: await this.service.handlerRefreshToken(req.body.refreshToken),
    }).send(res);
  };
  checkLoginEmailToken = async (req, res, next) => {
    const { token = null } = req.query;

    const check = await this.service.checkLoginEmailTokenService({ token });
    if (check) {
      return res
        .status(200)
        .redirect(`http://localhost:3000/xac-nhan/${check.message}`);
    } else {
      return res.status(500);
    }
  };
  changeAvatar = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "changeAvatar",
      metaData: await this.service.changeAvatar(req.body),
    }).send(res);
  };
  updateInfomation = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "updateInfomation",
      metaData: await this.service.updateInfomation(req.body),
    }).send(res);
  };
  resetPassword = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "resetPassword",
      metaData: await this.service.resetPassword(req.body),
    }).send(res);
  };
  verifyOtp = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "verifyOtp",
      metaData: await this.service.verifyOtp(req.body),
    }).send(res);
  };
  checkPassword = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "checkPassword",
      metaData: await this.service.checkPassword(req.body),
    }).send(res);
  };
  changePassword = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "changePassword",
      metaData: await this.service.changePassword(req.body),
    }).send(res);
  };
  getNameAndAvatarCustomer = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getNameAndAvatarCustomer",
      metaData: await this.service.getNameAndAvatarCustomer(),
    }).send(res);
  };
  updateCustomerStatus = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "updateCustomerStatus",
      metaData: await this.service.updateCustomerStatus(req.body),
    }).send(res);
  };
  findCustomerById = async (req, res, next) => {
    console.log(req);
    return new successResponse.SuccessResponse({
      message: "findCustomerById",
      metaData: await this.service.findCustomerById(req.body),
    }).send(res);
  };
}

module.exports = new CustomerController();
