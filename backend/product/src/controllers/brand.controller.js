"use strict";
const { successResponse } = require("../core");
const BrandService = require("../services/brand.service");

class BrandController {
  constructor() {
    this.service = new BrandService();
  }
  createBrand = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "newBrand success",
      metaData: await this.service.newBrand(req.body),
    }).send(res);
  };

  getListBrand = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getListBrand success",
      metaData: await this.service.getListBrand(req.body),
    }).send(res);
  };
  findBrandById = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "findBrandById success",
      metaData: await this.service.findBrandById(req.body),
    }).send(res);
  };
  updateOneBrand = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "updateOneBrand success",
      metaData: await this.service.updateOneBrand(req.body),
    }).send(res);
  };
  isTrash = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "isTrash success",
      metaData: await this.service.isTrash(req.body),
    }).send(res);
  };
  changeIsPublished = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "changeIsPublished success",
      metaData: await this.service.changeIsPublished(req.body),
    }).send(res);
  };
}
module.exports = new BrandController();
