"use strict";

const MenuSevice = require("../services/menu.service");
const { successResponse } = require("../core");
class MenuController {
  constructor() {
    this.service = new MenuSevice();
  }
  createMenu = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "createMenu success",
      metaData: await this.service.createMenu(req.body),
    }).send(res);
  };
  findMenuByPosition = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "findMenuByPosition success",
      metaData: await this.service.findMenuByPosition(req.body),
    }).send(res);
  };
  getAllMenu = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getAllMenu success",
      metaData: await this.service.getAllMenu(req.body),
    }).send(res);
  };
  getOneMenu = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getOneMenu success",
      metaData: await this.service.getOneMenu(req.body),
    }).send(res);
  };
  updateOneMenu = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "updateOneMenu success",
      metaData: await this.service.updateOneMenu(req.body),
    }).send(res);
  };
}

module.exports = new MenuController();
