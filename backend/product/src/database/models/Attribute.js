'use strict';

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'attribute'
const COLLECTION_NAME = 'attributes'

const attributeSchema = new Schema({
    attribute_name: { type: String, required:true },
    attribute_description: { type: String, default: '...' },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, attributeSchema)
