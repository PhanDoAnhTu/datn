'use strict'
const { successResponse } = require("../core")
const GalleryService = require("../services/gallery.service")

class GalleryController {

    addImage = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'addImage success',
            metaData: await GalleryService.addImage(req.body)
        }).send(res)
    }

    ListImageByProductId = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'ListImageByProductId success',
            metaData: await GalleryService.ListImageByProductId(req.body)
        }).send(res)
    }
}
module.exports = new GalleryController;