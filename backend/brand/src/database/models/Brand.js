"use strict";

const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = "brand"
const COLLECTION_NAME = "brands"

const BrandSchema = new Schema({
   brand_label: { type: String, required: true },
   brand_description: String,
   brand_position: { type: String, enum: ["navbar", "footer"], default: "navbar" },
   brand_icon: { type: String, default: "" },
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


module.exports = model(DOCUMENT_NAME, BrandSchema)
