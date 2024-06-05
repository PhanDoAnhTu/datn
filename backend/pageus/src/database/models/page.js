"use strict";

const { model, Schema } = require('mongoose')
const slugify = require("slugify");
const DOCUMENT_NAME = "page_us"
const COLLECTION_NAME = "pages_us"

const pageUsSchema = new Schema({
    page_us_title: { type: String, required: true },
    page_us_name: String,
    page_us_detail: { type: String },
    page_us_icon: { type: String, default: "" },
    page_us_slug: String,
    isPublished: { type: Boolean, default: false },

},
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
        collection: COLLECTION_NAME
    }
)

pageUsSchema.pre('save', function (next) {
    this.page_us_slug = slugify(this.page_us_title, { lower: true })
    next();
})
module.exports = model(DOCUMENT_NAME, pageUsSchema)
