"use strict";

const { successResponse } = require("../core");
const CategoryService = require("../services/category.service");

class CategoryController {
  constructor() {
    this.service = new CategoryService();
  }
  createCategory = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "createCategory success",
      metaData: await this.service.createCategory(req.body),
    }).send(res);
  };
  getListCategoryByParentId = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getListCategoryByParentId success",
      metaData: await this.service.getListCategoryByParentId(req.body),
    }).send(res);
  };
  getAllCategory = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "getAllCategory success",
      metaData: await this.service.getAllCategory(req.body),
    }).send(res);
  };
  changeIsPublished = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "changeIsPublished success",
      metaData: await this.service.changeIsPublished(req.body),
    }).send(res);
  };
  isTrashcategory = async (req, res, next) => {
    new successResponse.SuccessResponse({
      message: "isTrashcategory success",
      metaData: await this.service.isTrashcategory(req.body),
    }).send(res);
  };
}
module.exports = new CategoryController();
