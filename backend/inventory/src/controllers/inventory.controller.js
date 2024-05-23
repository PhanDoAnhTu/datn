
"use strict";

const InventoryService = require('../services/inventory.service');
const { successResponse } = require('../core');
class commentController {
    constructor() {
        this.service = new InventoryService()
    }
    addStockInventory = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "created new comment",
            metaData: await this.service.addStockInventory(req.body)
        }).send(res)
    }


}

module.exports = new commentController()