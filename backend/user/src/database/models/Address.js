const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DOCUMENT_NAME = "address"
const COLLECTION_NAME = "addresss"

const AddressSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'customer', require: true },
    phone_number: String,
    street: String,
    postal_code: String,
    city: String,
    country: String
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    });

module.exports = mongoose.model(DOCUMENT_NAME, AddressSchema);