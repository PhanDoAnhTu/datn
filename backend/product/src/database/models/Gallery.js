"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "gallery"
const COLLECTION_NAME = "galleries"

const userSchema = new Schema({
    spu_id: { type: Schema.Types.ObjectId, ref: "spu", require: true },
    sku_id: { type: String, default: null },
    thumb_url: { type: String, default: null },
    public_id: { type: String, default: null },
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, userSchema)