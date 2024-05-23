"use strict";

const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME = "staff"
const COLLECTION_NAME = "staffs"

const staffSchema = new Schema({
    staff_id: { type: String, required: true, default: "1" },
    staff_slug: { type: String, default: "" },
    staff_name: { type: String, default: "" },
    staff_password: { type: String, default: "" },
    staff_salf: { type: String, default: "" },
    staff_email: { type: String, required: true },
    staff_phone: { type: String, default: "" },
    staff_sex: { type: String, default: "" },
    staff_avatar: { type: String, default: "" },
    staff_date_of_birth: { type: Date, default: null },
    staff_role: { type: Schema.Types.ObjectId, ref: "staff_role", require: true  },
    staff_status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] }
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)
staffSchema.pre('save', function (next) {
    this.user_slug = slugify(this.user_name, { lower: true })
    next();
})


module.exports = model(DOCUMENT_NAME, staffSchema)