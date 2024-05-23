
"use strict";

const TemplateService = require('../services/template.service');
const { successResponse } = require('../core');
class TemplateController {
    constructor() {
        this.service = TemplateService;
    }
    newTemplate = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "created template success",
            metaData: await this.service.newTemplate(req.body)
        }).send(res)
    }
    getTemplate = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "get template success",
            metaData: await this.service.getTemplate(req.body)
        }).send(res)
    }



}

module.exports = new TemplateController