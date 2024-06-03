'use strict'
const { successResponse } = require("../core")
const AtributeService = require("../services/attribute.service")

class AtributeController {
    constructor() {
        this.service = new AtributeService()
    }

}
module.exports = new AtributeController;