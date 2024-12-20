'use strict'
const { Types, now } = require('mongoose')
const { errorResponse } = require('../core')
const { specialOfferRepository } = require('../database')
const { SpecialOfferModel } = require('../database/models')

class SpecialOfferService {

    async createSpecialOffer(payload) {
        const {
            special_offer_name, special_offer_start_date, special_offer_end_date, special_offer_image = null, special_offer_is_active = false,
            special_offer_description, special_offer_spu_list = []
        } = payload

        if (Date.now() > new Date(special_offer_start_date) || Date.now() > new Date(special_offer_end_date)) {
            throw new errorResponse.ForbiddenRequestError('special offer has expired')
        }

        if (new Date(special_offer_start_date) >= new Date(special_offer_end_date)) {
            throw new errorResponse.ForbiddenRequestError('start date must be before end_date')
        }
        const checkStartDate = await this.findSpecialOfferBetweenStartDateAndEndByDate({ date: special_offer_start_date })
        const checkEndDate = await this.findSpecialOfferBetweenStartDateAndEndByDate({ date: special_offer_end_date })
        if (checkStartDate || checkEndDate) {
            throw new errorResponse.ForbiddenRequestError('The time of the special offer program overlapped')
        }

        const newSpecialOffer = await SpecialOfferModel.create({
            special_offer_name: special_offer_name,
            special_offer_description: special_offer_description,
            special_offer_start_date: special_offer_start_date,
            special_offer_end_date: special_offer_end_date,
            special_offer_image: special_offer_image,
            isPublished: special_offer_is_active,
            special_offer_spu_list: special_offer_spu_list
        })
        return newSpecialOffer
    }


    async findSpecialOfferBySpuId({ spu_id, special_offer_is_active = true
    }) {
        try {
            let now = new Date();
            const special = await SpecialOfferModel.findOne({
                isPublished: special_offer_is_active,
                special_offer_start_date: { $lte: now },
                special_offer_end_date: { $gte: now },
                'special_offer_spu_list.product_id': {
                    $all: [spu_id]
                }
            })
            return special
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async findSpecialOfferBetweenStartDateAndEndByDate({ special_offer_is_active = true, date = Date.now() }) {
        let now = new Date(date);
        const special = await SpecialOfferModel.findOne({
            isPublished: special_offer_is_active,
            special_offer_start_date: { $lte: now },
            special_offer_end_date: { $gte: now }
        }).lean()
        return special
    }
    async updateStatusById({ isPublished, special_offer_id }) {
        const foundSpecialOffer = await SpecialOfferModel.findOne({
            _id: special_offer_id
        })
        if (!foundSpecialOffer) return null
        foundSpecialOffer.isPublished = isPublished

        // console.log(foundSpecialOffer)

        const updateSpecialOffer = await foundSpecialOffer.updateOne(foundSpecialOffer)
        return updateSpecialOffer
    }
    async findSpecialOfferTodayBySpuIdList({ spu_id_list = [], special_offer_is_active = true }) {
        let now = new Date();
        const special = await SpecialOfferModel.findOne({
            isPublished: special_offer_is_active,
            special_offer_start_date: { $lte: now },
            special_offer_end_date: { $gte: now },
            'special_offer_spu_list.product_id': {
                $in: spu_id_list
            }
        }).lean()
        return special
    }
    async getAllSpecialOffer() {
        const special = await SpecialOfferModel.find()
        return special
    }
    async onChangeStatusSpecialOfferById({ isPublished, special_offer_id }) {

        if (isPublished == true) {
            const special = await SpecialOfferModel.findOne({ _id: special_offer_id })
            if (!special) throw new errorResponse.NotFoundRequestError("not found")
            const checkStartDate = await this.findSpecialOfferBetweenStartDateAndEndByDate({ date: special.special_offer_start_date })
            const checkEndDate = await this.findSpecialOfferBetweenStartDateAndEndByDate({ date: special.special_offer_end_date })
            if (checkStartDate || checkEndDate) {
                throw new errorResponse.ForbiddenRequestError('The time of the special offer program overlapped')
            }
        }
        const query = { _id: special_offer_id }
        const updateOrInsert = {
            $set: {
                isPublished: isPublished
            }
        }, options = {
            upsert: true,
            new: true
        }
        return await SpecialOfferModel.findOneAndUpdate(query, updateOrInsert, options)
    }
    async isTrashPromotion({
        isDeleted = false,
        special_offer_id,
    }) {
        const discount = await SpecialOfferModel.findOne({
            _id: special_offer_id,
        })

        discount.isPublished = false

        discount.isDeleted = isDeleted

        return await discount.updateOne(discount)
    }
    async removeSpecialOfferById({ special_offer_id }) {
        const special = await SpecialOfferModel.findOne({ _id: special_offer_id })
        if (!special) throw new errorResponse.NotFoundRequestError("not found")
        if (special.isPublished == true) throw new errorResponse.ForbiddenRequestError("active using")
        return await SpecialOfferModel.deleteOne({ _id: special_offer_id })
    }

    async updateQuantityProduct({ promotion_id, productId, quantity }) {
        return await SpecialOfferModel.updateOne({
            _id: promotion_id,
            "special_offer_spu_list.product_id": productId
        }, {
            $inc: {
                "special_offer_spu_list.$.product_stock": -quantity,
                "special_offer_spu_list.$.quantity": -quantity,
                "special_offer_spu_list.$.quantity_sold": quantity
            }
        })
    }
    async updateQuantitySku({ promotion_id, productId, sku_id, _quantity }) {

        const promotion = await SpecialOfferModel.findOne({
            _id: promotion_id,
            "special_offer_spu_list.product_id": productId,
            "special_offer_spu_list.sku_list.sku_id": sku_id,
        })
        const a = promotion.special_offer_spu_list.find((prod) => prod.product_id === productId)
        const b = a.sku_list.map((sku) => {
            if (sku.sku_id === sku_id) {
                let sku_stock_old = sku.sku_stock
                let quantity_old = sku.quantity
                let quantity_sold_old = sku.quantity_sold
                const { sku_stock, quantity, quantity_sold, ...skuNew } = sku
                return { ...skuNew, sku_stock: sku_stock_old - _quantity, quantity: quantity_old - _quantity, quantity_sold: quantity_sold_old + _quantity }
            }
            return sku
        })
        const c = promotion.special_offer_spu_list.flatMap((prod) => prod.product_id)
        const d = c.indexOf(productId)
        promotion.special_offer_spu_list[d].sku_list = b

        return await promotion.updateOne(promotion)
    }
    async applyPromotion({ promotion_id, item_products }) {
        try {
            if (item_products.length > 0) {
                item_products.map(async (product) => {
                    if (product?.sku_id !== null) {
                        await this.updateQuantitySku({ promotion_id, productId: product.productId, sku_id: product.sku_id, _quantity: product.quantity })
                    }
                    await this.updateQuantityProduct({ promotion_id, productId: product.productId, quantity: product.quantity })
                })
            }
            return true
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async serverRPCRequest(payload) {
        const { type, data } = payload;
        const { special_offer_is_active, date, spu_id_list, spu_id } = data
        switch (type) {
            case "FIND_SPECIAL_OFFER_BY_DATE":
                return this.findSpecialOfferBetweenStartDateAndEndByDate({ date, special_offer_is_active })
            // case "FIND_SPECIAL_OFFER_TODAY_BY_ID_LIST":
            //     return this.findSpecialOfferTodayBySpuIdList({ spu_id_list, special_offer_is_active })
            case "FIND_SPECIAL_OFFER_TODAY_BY_ID":
                return this.findSpecialOfferBySpuId({ spu_id, special_offer_is_active })
            case "APPLY_PROMOTION":
                return this.applyPromotion({ promotion_id, item_products })

            default:
                break;
        }
    }


}

module.exports = SpecialOfferService