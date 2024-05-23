"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "key_token"
const COLLECTION_NAME = "keys_token"

const keySchema = new Schema({
    user: { type: Schema.Types.ObjectId, require: true },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
    refreshToken: { type: String, required: true },
    refreshTokensUsed: { type: Array, default: [] }

},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, keySchema)