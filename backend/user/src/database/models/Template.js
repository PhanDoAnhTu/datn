"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "template"
const COLLECTION_NAME = "templates"

const temSchema = new Schema({
    tem_id: { type: Number, required: true },
    tem_name: { type: String, required: true },
    tem_status: { type: String, default: 'active' },
    tem_html: { type: String, required: true },

},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, temSchema)