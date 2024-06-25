"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "slider";
const COLLECTION_NAME = "sliders";

const sliderSchema = new Schema(
  {
    slider_name: String,
    slider_link: { type: String, default: null },
    slider_description: String,
    slider_summary: { type: String, default: null },
    slider_position: {
      type: String,
      enum: ["banner", "body"],
      default: "banner",
    },
    slider_image: { type: String },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    isDeleted: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, sliderSchema);
