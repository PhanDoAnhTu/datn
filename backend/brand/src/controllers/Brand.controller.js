
"use strict";

const BrandSevice = require('../services/Brand.service');
const { successResponse } = require('../core');
class BrandController {

  constructor() {
    this.service = new BrandSevice()
  }
  createBrand = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "createBrand success",
      metaData: await this.service.createBrand(req.body),
    }).send(res);
  };
  findBrandByPosition = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "findBrandByPosition success",
      metaData: await this.service.findBrandByPosition(req.body),
    }).send(res);
  };

}

module.exports = new BrandController()