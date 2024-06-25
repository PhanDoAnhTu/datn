"use strict";

const { errorResponse } = require("../core");
const { SliderModel } = require("../database/models");
const { SliderRepository } = require("../database");
const { Types } = require("mongoose");

class SliderService {
  createSlider = async ({
    slider_name,
    slider_link,
    slider_description,
    slider_summary,
    slider_position,
    slider_image,
    isPublished = false,
  }) => {
    try {
      const slider = await SliderModel.create({
        slider_name,
        slider_link,
        slider_description,
        slider_summary,
        slider_position,
        slider_image,
        isPublished,
      });
      return slider;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getAllSliderByActive = async ({ slider_is_active = true }) => {
    try {
      const slider = await SliderModel.find({
        isPublished: slider_is_active,
      });
      return slider;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  getAllSlider = async () => {
    try {
      const slider = await SliderModel.find();
      return slider;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  changeActive = async ({ slider_id, isPublished = false }) => {
    try {
      const slider = await SliderModel.findOne({
        _id: slider_id
      });
      slider.isPublished = isPublished

      return await slider.updateOne(slider);
    } catch (error) {
      console.log(error);
      throw new errorResponse.NotFoundRequestError("not found")
    }
  };

  isTrash = async ({ slider_id, isDeleted = false }) => {
    try {
      const slider = await SliderModel.findOne({
        _id: slider_id
      });
      slider.isDeleted = isDeleted
      slider.isPublished = false
      return await slider.updateOne(slider);
    } catch (error) {
      console.log(error);
      throw new errorResponse.NotFoundRequestError("not found")
    }
  };

  // async serverRPCRequest(payload) {
  //     const { type, data } = payload;
  //     const { } = data
  //     switch (type) {
  //         case "":
  //         default:
  //             break;
  //     }
  // }
}

module.exports = SliderService;
