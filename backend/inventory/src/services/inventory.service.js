'use strict'
const { errorResponse } = require('../core')
const { inventoryRepository } = require('../database')

const { InventoryModel } = require('../database/models')
class InventoryService {
    async addStockInventory({
        stock,
        productId,
        location = '123, dxh, thu duc'
    }) {
        // const product = await getProductById(productId)
        // if (!product) throw new errorResponse.BadRequestError('the product not exists')
        const query = { inven_productId: productId },
            updateSet = {
                $inc: {
                    inven_stock: stock
                },
                $set: {
                    inven_location: location
                }
            }, options = { upsert: true, new: true }
        return await InventoryModel.findOneAndUpdate(query, updateSet, options)


    }
    async reservationInventory({
        productId, quantity, cartId
    }) {
        return await inventoryRepository.reservationInventory({ productId, quantity, cartId })
    }
    async serverRPCRequest(payload) {
        const { type, data } = payload;
        const { productId, quantity, cartId } = data
        switch (type) {
            case "RESERVATION_INVENTORY":
                return this.reservationInventory({ productId, quantity, cartId })
            default:
                break;
        }
    }

}
module.exports = InventoryService