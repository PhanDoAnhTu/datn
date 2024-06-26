const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'brand'
const COLLECTION_NAME = 'brands'

const brandSchema = new Schema({
    brand_name: { type: String, required: true },
    brand_description: { type: String, default: "notfound" },
    brand_image: { type: String, default: null },
    isPublished: { type: Boolean, default: false, index: true, select: true },
    isDeleted: { type: Boolean, default: false, index: true, select: true },
    isDraft: { type: Boolean, default: false, index: true, select: true },

},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    }
)

module.exports = model(DOCUMENT_NAME, brandSchema)
