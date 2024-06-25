const { model, Schema, Types } = require('mongoose')
const DOCUMENT_NAME = 'specialOffer'
const COLLECTION_NAME = 'specialOffers'

const specialOfferSchema = new Schema({
    special_offer_name: { type: String, required: true },
    special_offer_description: { type: String, required: true ,default:''},
    special_offer_start_date: { type: Date, required: true }, 
    special_offer_end_date: { type: Date, required: true }, 
    special_offer_image: { type: String, default: null }, 
    special_offer_is_active: { type: Boolean, default: false },
    special_offer_spu_list: { type: Schema.Types.Mixed, required: true },
    isDeleted: { type: Boolean, default: false, index: true, select: true }
},
    {
        collection: COLLECTION_NAME,
        timestamps: true
    })


module.exports = model(DOCUMENT_NAME, specialOfferSchema)

