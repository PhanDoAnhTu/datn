"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "slider"
const COLLECTION_NAME = "sliders"

const sliderSchema = new Schema({
    slider_name: String,
    slider_link: String,
    slider_description: String,
    slider_summary: String,
    slider_position: String,
    slider_image: { String: String },
    slider_is_active: { type: Boolean, default: false }
},
    {
        timestamps: true
        ,
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, sliderSchema)
