'use strict';

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'spu_attribute'
const COLLECTION_NAME = 'spu_attributes'

const spu_attributeSchema = new Schema({
    spu_id: { type: String, required: true },
    attribute_id: { type: String, required: true },
    attribute_value: { type: Array, required: true },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, spu_attributeSchema)
