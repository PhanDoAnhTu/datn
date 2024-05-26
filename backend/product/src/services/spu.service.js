'use strict'
const { errorResponse } = require('../core')
const { SpuModel } = require('../database/models')
const { addImage } = require('./gallery.service')
const { newSku, allSkuBySpuId } = require('./sku.Service')
const { spuRepository } = require('../database')
const _ = require('lodash')
const { Types } = require('mongoose')

const newSpu = async ({
    product_name,
    product_thumb,
    product_description,
    product_slug,
    product_price,
    product_category,
    product_brand,
    product_quantity,
    product_attributes = [],
    product_variations = [],
    sku_list = [],
    product_unit = null,
    isPublished = false

}) => {
    try {
        //create new spu
        const spu = await SpuModel.create({
            product_name,
            product_thumb,
            product_description,
            product_slug,
            product_price,
            product_category,
            product_quantity,
            product_brand,
            product_attributes,
            product_variations,
            product_unit,
            isPublished
        })
        if (spu && sku_list.length) {
            const skus = await newSku({ spu_id: spu._id, sku_list })
            sku_list.map(sku => {
                skus.map(skuModel => {
                    if (skuModel.sku_tier_idx.toString() === sku.sku_tier_idx.toString()) {
                        addImage({ spu_id: spu._id, sku_id: skuModel._id, thumb_url: sku.thumb_url, public_id: sku.public_id })
                    }
                })
            })

        }
        return spu
    }
    catch (error) {
        console.log(`error`, error)

    }
}

const oneSpu = async ({ spu_id }) => {
    try {
        const spu = await SpuModel.findOne({
            _id: Types.ObjectId(spu_id),
            isPublished: true
        })
        if (!spu) throw new errorResponse.NotFoundRequestError('spu not found')
        const skus = await allSkuBySpuId({ product_id: spu._id })

        return {
            spu_info: _.omit(spu, ['__v', 'updateAt']),
            sku_list: skus.map(sku => _.omit(sku, ['__v', 'updateAt', 'createAt', 'isDeleted']))
        }

    } catch (error) {
        return null
    }
}
const PublishProduct = async ({ product_id }) => {
    console.log(product_id)
    return await spuRepository.publishProduct({ product_id })
}

const UnPublishProduct = async ({ product_id }) => {
    console.log(product_id)
    return await spuRepository.unPublishProduct({ product_id })
}

const AllProducts = async ({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) => {
    return await spuRepository.getAllProducts({
        limit, sort, page, filter,
        select: ['product_name', 'product_thumb', 'product_price', 'product_type']
    })
}
const checkProductById = async ({ productId }) => {
    return await spuRepository.getProductById({ productId })
}

const checkProductByServer = async ({ products }) => {
    return await spuRepository.checkProductByServer({ products })
}

const serverRPCRequest = async (payload) => {
    const { type, data } = payload;
    const { products, productId } = data
    switch (type) {
        case"CHECK_PRODUCT_BY_SERVER":
            return checkProductByServer({ products })
        case"CHECK_PRODUCT_BY_ID":
            return checkProductById({ productId })
        default:
            break;
    }
}

module.exports = {
    newSpu, oneSpu,
    serverRPCRequest,
    checkProductByServer, PublishProduct, AllProducts, UnPublishProduct, checkProductById

}