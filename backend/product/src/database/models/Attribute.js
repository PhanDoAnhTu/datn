'use strict';

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'attribute'
const COLLECTION_NAME = 'attributes'

const attributeSchema = new Schema({
    attribute_name: { type: String, required: true },
    attribute_description: { type: String, default: '...' },
    attribute_slug: { type: String }

}, {
    timestamps: true,
    collection: COLLECTION_NAME
})
attributeSchema.pre('save', function (next) {
    this.attribute_slug = slugify(this.attribute_name, { lower: true })
    next();
})

module.exports = model(DOCUMENT_NAME, attributeSchema)
