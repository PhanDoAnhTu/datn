const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'brand'
const COLLECTION_NAME = 'brands'

const brandSchema = new Schema({
    brand_name: { type: String, required: true },
    brand_description: String,
    brand_image: { type: Array, default: [] },
    isPublished: { type: Boolean, default: true, index: true, select: false },
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
)

module.exports = model(DOCUMENT_NAME, brandSchema)
