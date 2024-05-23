"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "staff_role"
const COLLECTION_NAME = "staff_roles"

const userSchema = new Schema({
    rol_name: { type: String, require: true ,enum:['admin','admin2']},
    rol_slug: { type: String, required: true },
    rol_status: { type: String, default: "active", enum: ['active', 'block', "pending"] },
    rol_description: { type: String, default: "" },
    rol_grants: [
        {
            resource: { type: Schema.Types.ObjectId, ref: "resource" },
            actions: [{ type: String, required: true }],
            attributes: { type: String, default: "*" }
        }
    ]

},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, userSchema)