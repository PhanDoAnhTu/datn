'use strict'
const { BrandModel } = require('../database/models')
const { getSelectData } = require('../utils/index')
class BrandService {
    async newBrand({
        brand_name, brand_image = null, brand_description, isPublished = true
    }) {
        try {
            const brands = await BrandModel.create({
                brand_name, brand_image, brand_description, isPublished
            })
            return brands

        } catch (error) {
            return null
        }
    }
    async getListBrand({ isPublished = true }) {
        try {
            const listbrand = await BrandModel.find({
                isPublished
            })
            return listbrand

        } catch (error) {
            return null

        }
    }
    async findBrandById({ isPublished = true, brand_id }) {
        try {
            const brand = await BrandModel.findOne({
                isPublished,
                _id: brand_id
            })
            return brand

        } catch (error) {
            return null

        }
    }
}

module.exports = BrandService