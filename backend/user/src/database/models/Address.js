const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DOCUMENT_NAME = "address"
const COLLECTION_NAME = "addresss"

const AddressSchema = new Schema({
    customer_id: { type: String, require: true },
    phone_number: { type: String, require: true },
    customer_name: { type: String, default: "" },
    street: { type: String, default: "" },
    postal_code: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    isDefault: { type: Boolean, default: false }
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    });

module.exports = mongoose.model(DOCUMENT_NAME, AddressSchema);