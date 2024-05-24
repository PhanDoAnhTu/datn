'use strict'
const { Types } = require('mongoose')
const { errorResponse } = require('../core')
const { specialOfferRepository } = require('../database')
const { SpecialOfferModel } = require('../database/models')

class SpecialOfferService {

    async createSpecialOffer(payload) {
        const {
            special_offer_name, special_offer_start_date, special_offer_end_date, special_offer_image = [], special_offer_is_active = false,
            special_offer_description, special_offer_spu_list = []
        } = payload


        if (Date.now() > new Date(special_offer_start_date) || Date.now() > new Date(special_offer_end_date)) {
            throw new errorResponse.ForbiddenRequestError('discount code has expired')
        }

        if (new Date(special_offer_start_date) >= new Date(special_offer_end_date)) {
            throw new errorResponse.ForbiddenRequestError('start date must be before end_date')
        }
        const newSpecialOffer = await SpecialOfferModel.create({
            special_offer_name: special_offer_name,
            special_offer_description: special_offer_description,
            special_offer_start_date: special_offer_start_date,
            special_offer_end_date: special_offer_end_date,
            special_offer_image: special_offer_image,
            special_offer_is_active: special_offer_is_active,
            special_offer_spu_list: special_offer_spu_list
        })
        console.log(newSpecialOffer)
        return newSpecialOffer
    }

    async getSpecialOfferBySpuId({ spu_id }) {
        const special = await SpecialOfferModel.findOne({
            special_offer_is_active: true,
            'special_offer_spu_list.product_id': {
                $all: [spu_id]
            }
        })
        console.log(special)
        return special
    }


}

module.exports = SpecialOfferService