
'use strict'
const { InventoryModel } = require('../models')

const { Types } = require('mongoose')

const insertInventory = async ({
    productId, stock, location = 'unKnow'
}) => {
    return await InventoryModel.create({
        inven_productId: productId,
        inven_stock: stock,
        inven_location: location,
    })

}

const reservationInventory = async ({ productId, quantity, cartId, }) => {
    const query = {
        inven_productId: Types.ObjectId(productId),
        inven_stock: { $gte: quantity }
    }, updateSet = {
        $inc: {
            inven_stock: -quantity
        },
        $push: {
            inven_reservations: {
                quantity,
                cartId,
                createOn: new Date()
            }
        }
    }, options = { upsert: true, new: true }

    return await InventoryModel.updateOne(query, updateSet)

}
module.exports = {
    insertInventory, reservationInventory
}
