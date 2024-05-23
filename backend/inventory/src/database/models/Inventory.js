"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "inventory"
const COLLECTION_NAME = "inventories"

const inventorySchema = new Schema({
    inven_product: { type: Schema.Types.ObjectId },
    inven_location: { type: String, default: 'unKnow' },
    inven_stock: { type: Number, require: true },
    inven_reservation: { type: Array, default: [] }

},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, inventorySchema)