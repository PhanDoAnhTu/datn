"use strict";

const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME = "cart"
const COLLECTION_NAME = "carts"

const cartSchema = new Schema({
    cart_state: { type: String, default: 'active', enum: ['pending', 'active', 'completed', 'faied'] },
    cart_products: { type: Array, required: true, default: [] },
    cart_count_product: { type: Number, default: 0 },
    cart_userId: { type: String, required: true },

},
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, cartSchema)
