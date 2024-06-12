"use strict";
const { CategoryModel } = require("../database/models");
const { getSelectData } = require("../utils");

class CategoryService {
  async createCategory(payload) {
    const {
      parent_id = null,
      category_name,
      category_description,
      category_icon = null,
      category_image = null,
      isPublished = true
    } = payload;

    const newCategory = await CategoryModel.create({
      parent_id: parent_id,
      category_name: category_name,
      category_description: category_description,
      category_icon: category_icon,
      category_image: category_image,
      isPublished
    });
    return newCategory;
  }

  async getListCategoryByParentId({ sort, parent_id }) {
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const listcategory = await CategoryModel.find({
      parent_id: parent_id,
    });
    return listcategory;
  }
  async getAllCategory({ isPublished = true }) {
    const listcategory = await CategoryModel.find({ isPublished });
    return listcategory;
  }
  async findCategoryById({ isPublished = true, category_id }) {
    const category = await CategoryModel.findOne({ _id: category_id, isPublished });
    console.log('findCategoryById', category)
    return category;
  }
  async findCategoryByIdList({ isPublished = true, category_id_list }) {
    try {
      const categories = await CategoryModel.find({
        isPublished,
        _id: {
          $in: category_id_list
        }
      });
      console.log('findCategoryByIdList', categories)
      return categories;
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async serverRPCRequest(payload) {
    const { type, data } = payload;
    const { category_id, isPublished = true, category_id_list } = data
    switch (type) {
      case "FIND_CATEGORY_BY_ID":
        return this.findCategoryById({ isPublished, category_id })
      case "FIND_CATEGORY_BY_ID_LIST":
        return this.findCategoryByIdList({ isPublished, category_id_list })

      default:
        break;
    }
  }
}
module.exports = CategoryService;
