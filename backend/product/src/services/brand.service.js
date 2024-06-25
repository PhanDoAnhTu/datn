"use strict";
const { BrandModel } = require("../database/models");
const { getSelectData } = require("../utils/index");
class BrandService {
  async newBrand({
    brand_name,
    brand_image = null,
    brand_description,
    isPublished = true,
  }) {
    try {
      const brands = await BrandModel.create({
        brand_name,
        brand_image,
        brand_description,
        isPublished,
      });
      return brands;
    } catch (error) {
      return null;
    }
  }
  async getListBrand({ isPublished = true }) {
    try {
      const listbrand = await BrandModel.find({
        isPublished,
      });
      return listbrand;
    } catch (error) {
      return null;
    }
  }
  async findBrandById({ isPublished = true, brand_id }) {
    try {
      const brand = await BrandModel.findOne({
        isPublished,
        _id: brand_id,
      }).lean();
      return brand;
    } catch (error) {
      return null;
    }
  }
  async updateOneBrand({
    brand_id,
    brand_image = null,
    brand_name,
    brand_description,
  }) {
    try {
      const date = new Date();
      const brand = await BrandModel.findOneAndUpdate(
        {
          _id: brand_id,
        },
        brand_image
          ? {
              brand_image: brand_image,
              brand_name: brand_name,
              brand_description: brand_description,
              updatedAt: date,
            }
          : {
              brand_name: brand_name,
              brand_description: brand_description,
              updatedAt: date,
            },
        { new: true }
      ).lean();
      return brand;
    } catch (error) {
      return null;
    }
  }
}

module.exports = BrandService;
