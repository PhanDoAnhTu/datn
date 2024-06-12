'use strict'
const { successResponse } = require("../core")
const AtributeService = require("../services/attribute.service")

class AtributeController {
    constructor() {
        this.service = new AtributeService()
    }

    newAttribute = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'newAttribute success',
            metaData: await this.service.newAttribute(req.body)
        }).send(res)
    }
    findAllAttribute = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'findAllAttribute success',
            metaData: await this.service.findAllAttribute(req.body)

        }).send(res)
    }

    findAttributeById = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'findAttributeById success',
            metaData: await this.service.findAttributeById(req.body)

        }).send(res)
    }

}
module.exports = new AtributeController;