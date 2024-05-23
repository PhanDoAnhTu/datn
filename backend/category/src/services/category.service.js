'use strict'
const { CategoryModel } = require('../database/models')
const { getSelectData } = require('../utils')

class CategoryService {
    async createCategory(payload) {
        const {
            parent_id = null, category_name, category_description,
            category_icon = "", category_image = []
        } = payload

        const newCategory = await CategoryModel.create({
            parent_id: parent_id,
            category_name: category_name,
            category_description: category_description,
            category_icon: category_icon,
            category_image: category_image
        })
        return newCategory
    }

    async getListCategoryByParentId({ sort, parent_id }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listcategory = await CategoryModel.find({
            parent_id: parent_id,

        })
        return listcategory
    }

}
module.exports = CategoryService