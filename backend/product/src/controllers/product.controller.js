"use strict";

const SpuService = require("../services/spu.service");
const { successResponse } = require("../core");
class spuController {
  newSpu = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "Created new spu",
      metaData: await SpuService.newSpu(req.body),
    }).send(res);
  };

  oneSpu = async (req, res, next) => {
    const { spu_id } = req.query;
    console.log(req.query);
    return new successResponse.SuccessResponse({
      message: "Get one spu",
      metaData: await SpuService.oneSpu({ spu_id }),
    }).send(res);
  };

  AllProducts = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "Get All",
      metaData: await SpuService.AllProducts(req.body),
    }).send(res);
  };
  getAllProductsByfilter = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getAllProductsByfilter success",
      metaData: await SpuService.getAllProductsByfilter(req.body),
    }).send(res);
  };
  PublishProduct = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "Get All spu by limit, sort, page, filter",
      metaData: await SpuService.PublishProduct(req.body),
    }).send(res);
  };

  newSpuAttribute = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: 'newSpuAttribute success',
      metaData: await SpuService.newSpuAttribute(req.body)
    }).send(res)
  }
  findAttributeBySpuId = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: 'findAttributeBySpuId success',
      metaData: await SpuService.findAttributeBySpuId(req.body)
    }).send(res)
  }
}

module.exports = new spuController();
