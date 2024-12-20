"use strict";

const SliderService = require("../services/slider.service");
const { successResponse } = require("../core");
class SliderController {
  constructor() {
    this.service = new SliderService();
  }
  createSlider = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "createSlider success",
      metaData: await this.service.createSlider(req.body),
    }).send(res);
  };
  getAllSliderByActive = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getAllSliderByActive success",
      metaData: await this.service.getAllSliderByActive(req.body),
    }).send(res);
  };
  changeActive = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "changeActive success",
      metaData: await this.service.changeActive(req.body),
    }).send(res);
  };

  updateOneSlider = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "updateOneSlider success",
      metaData: await this.service.updateOneSlider(req.body),
    }).send(res);
  };
  getOneSlider = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getOneSlider success",
      metaData: await this.service.getOneSlider(req.body),
    }).send(res);
  };

  isTrash = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "isTrash success",
      metaData: await this.service.isTrash(req.body),
    }).send(res);
  };
  getAllSlider = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getAllSlider success",
      metaData: await this.service.getAllSlider(req.body),
    }).send(res);
  };
}

module.exports = new SliderController();
