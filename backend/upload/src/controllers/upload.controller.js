
"use strict";

const UploadService = require('../services/upload.service');
const { successResponse, errorResponse } = require('../core');
class UploadController {
    constructor() {
        this.service = new UploadService();
    }

    uploadSkuImageList = async (req, res, next) => {
        const { files } = req
        console.log(req.body)
        if (!files.length) throw new errorResponse.BadRequestError("files missing")
        return new successResponse.SuccessResponse({
            message: "uploadSkuImageList success",
            metaData: await this.service.uploadSkuImageList(
                files,req.body
            )
        }).send(res)
    }

    uploadSingleImage = async (req, res, next) => {
        const { file } = req
        console.log(req.body)
        return new successResponse.SuccessResponse({
            message: "uploadImageFormLocalFiles success",
            metaData: await this.service.uploadSingleImage(
                file,req.body
            )
        }).send(res)
    }
    uploadImageArray = async (req, res, next) => {
        const { files } = req
        console.log(req.body)
        if (!files.length) throw new errorResponse.BadRequestError("files missing")
        return new successResponse.SuccessResponse({
            message: "uploadImageArray success",
            metaData: await this.service.uploadImageArray(
                files,req.body
            )
        }).send(res)
    }


}

module.exports = new UploadController