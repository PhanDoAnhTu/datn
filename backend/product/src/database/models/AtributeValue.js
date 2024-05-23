'use strict';

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'attribute_value'
const COLLECTION_NAME = 'attribute_values'

const attribute_valueSchema = new Schema({
    attribute_id: { type: String, required:true },
    attribute_value: { type: String, default: '...' },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, attribute_valueSchema)
