'use strict'
const { successResponse } = require("../core")
const BrandService = require("../services/brand.service")

class BrandController {
    constructor() {
        this.service = new BrandService()
    }
    createBrand = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'newBrand success',
            metaData: await this.service.newBrand(req.body)
        }).send(res)
    }

    getListBrand = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'getListBrand success',
            metaData: await this.service.getListBrand(req.body)
        }).send(res)
    }
    findBrandById = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'findBrandById success',
            metaData: await this.service.findBrandById(req.body)
        }).send(res)
    }
}
module.exports = new BrandController;