
"use strict";

const MenuSevice = require('../services/menu.service');
const { successResponse } = require('../core');
class MenuController {

  constructor() {
    this.service = new MenuSevice()
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

}

module.exports = new MenuController()