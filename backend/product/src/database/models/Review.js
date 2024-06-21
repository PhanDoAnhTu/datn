const { model, Schema, Types } = require('mongoose')
const DOCUMENT_NAME = 'review'
const COLLECTION_NAME = 'reviews'

const reviewSchema = new Schema({
    customer_id: { type: String, required: true },
    order_id: { type: String, required: true },
    product_id: { type: String, required: true },
    images: { type: Array, default: null },
    sku_id: { type: String, default: null },
    rating_score: { type: Number, required: true },
    rating_content: { type: String, default: "" },
    isPublished: { type: Boolean, default: true, index: true, select: false },

},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })
module.exports = model(DOCUMENT_NAME, reviewSchema)


