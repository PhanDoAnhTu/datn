"use strict";

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = "contact"
const COLLECTION_NAME = "contact"

const contactSchema = new Schema({


},
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'modifiedOn'
        },
        collection: COLLECTION_NAME
    }
)


module.exports = model(DOCUMENT_NAME, contactSchema)
