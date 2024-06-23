"use strict";

const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME = "customer"
const COLLECTION_NAME = "customers"

const customerSchema = new Schema({
    customer_account_id: { type: String, default: "" },
    customer_slug: { type: String, default: "" },
    customer_name: { type: String, default: "" },
    customer_password: { type: String, default: "" },
    customer_salf: { type: String, default: "" },
    customer_email: { type: String, default: "" },
    customer_phone: { type: String, default: "" },
    customer_sex: { type: String, default: "" },
    customer_avatar: { type: String, default: "" },
    customer_date_of_birth: { type: Date, default: null },
    customer_provider:{type: String, default: ""},
    customer_status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] }
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)
customerSchema.pre('save', function (next) {
    this.customer_slug = slugify(this.customer_name, { lower: true })
    next();
})


module.exports = model(DOCUMENT_NAME, customerSchema)