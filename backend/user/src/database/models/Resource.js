"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "resource"
const COLLECTION_NAME = "resources"

const userSchema = new Schema({
    src_name: { type: String, require: true },
    src_slug: { type: String, required: true },
    src_description: { type: String, default: "" }
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, userSchema)