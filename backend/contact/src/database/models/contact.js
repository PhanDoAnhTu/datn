"use strict";

const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "contact";
const COLLECTION_NAME = "contact";

const contactSchema = new Schema(
  {
    reply_by: { type: String, default: null },
    customer_email: { type: String, required: true },
    customer_name: { type: String, required: true },
    contact_title: { type: String, required: true },
    contact_content: { type: String, required: true },
    isReply: { type: Boolean, default: false, index: true },
    // isPublished: { type: Boolean, default: true, index: true },
    // isDeleted: { type: Boolean, default: false, index: true }
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "modifiedOn",
    },
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, contactSchema);
