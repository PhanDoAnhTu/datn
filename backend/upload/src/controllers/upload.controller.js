
"use strict";

const UploadService = require('../services/upload.service');
const { successResponse, errorResponse } = require('../core');
class UploadController {
    constructor() {
        this.service = new UploadService();
    }

    uploadImageFormLocalFiles = async (req, res, next) => {
        const { files } = req
        console.log(req)
        if (!files.length) throw new errorResponse.BadRequestError("files missing")
        return new successResponse.SuccessResponse({
            message: "uploadImageFormLocalFiles",
            metaData: await this.service.uploadImageFormLocalFiles({
                files
            })
        }).send(res)
    }


}

module.exports = new UploadController