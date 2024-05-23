"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "wish_list"
const COLLECTION_NAME = "wish_lists"

const wish_listSchema = new Schema({
    wish_list_state: { type: String, default: 'active', enum: ['pending', 'active', 'completed', 'faied'] },
    wish_list_products: { type: Array, required: true, default: [] },
    wish_list_count_product: { type: Number, default: 0 },
    wish_list_userId: { type: String, required: true },

},
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, wish_listSchema)
