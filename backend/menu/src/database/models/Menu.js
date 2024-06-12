"use strict";

const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = "menu"
const COLLECTION_NAME = "menus"

const menuSchema = new Schema({
    menu_label: { type: String, required: true },
    menu_description: String,
    menu_position: { type: String, enum: ["navbar", "footer"], default: "navbar" },
    menu_icon: { type: String, default: "" },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    isDeleted: { type: Boolean, default: false, index: true, select: false }

},
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, menuSchema)
