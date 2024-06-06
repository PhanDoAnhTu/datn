'use strict'
const { errorResponse } = require('../core')
const { SpuModel, Spu_AttributeModel } = require('../database/models')
const { addImage } = require('./gallery.service')
const { newSku, allSkuBySpuId } = require('./sku.Service')
const { spuRepository } = require('../database')
const _ = require('lodash')
const { Types } = require('mongoose')
const { RPCRequest } = require('../utils')

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

const oneSpu = async ({ spu_id, isPublished = true }) => {
    try {
        const spu = await SpuModel.findOne({
            _id: Types.ObjectId(spu_id),
            isPublished
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

const AllProducts = async ({ sort = 'ctime', isPublished = true }) => {
    return await spuRepository.getAllProducts({
        sort, isPublished
    })
}
const getAllProductsByfilter = async ({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) => {
    return await spuRepository.getAllProductsByfilter({
        limit, sort, page, filter
    })
}
const findAllProductsByCategory = async ({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) => {

    let product_list = {
        productsByCategory: [],
        special_offer: []
    }
    product_list.productsByCategory = await spuRepository.getAllProductsByfilter({
        limit, sort, page, filter
    })
    if (product_list.productsByCategory.length == 0) return null
    const spu_id_list = product_list.productsByCategory.map((spu) => spu._id)

    product_list.special_offer = await RPCRequest("SPECIAL_OFFER_RPC", {
        type: "FIND_SPECIAL_OFFER_TODAY_BY_ID_LIST",
        data: {
            special_offer_is_active: true,
            spu_id_list: spu_id_list
        }
    })

    return product_list
}
const findProductDetail = async ({ spu_id, isPublished = true }) => {
    const { spu_info, sku_list } = await oneSpu({ spu_id, isPublished })
    let product = {
        product_detail: {},
        special_offer: {},
        sku_list: []
    }
    product.product_detail = spu_info ? spu_info : {}
    product.sku_list = sku_list ? sku_list : []
    product.special_offer = await RPCRequest("SPECIAL_OFFER_RPC", {
        type: "FIND_SPECIAL_OFFER_TODAY_BY_ID",
        data: {
            special_offer_is_active: true,
            spu_id: product.product_detail._id
        }
    })
    return product
}

const checkProductById = async ({ productId }) => {
    return await spuRepository.getProductById({ productId })
}

const checkProductByServer = async ({ products }) => {
    return await spuRepository.checkProductByServer({ products })
}

const newSpuAttribute = async ({
    attribute_id, spu_id
}) => {
    try {
        const spuAttributes = await Spu_AttributeModel.create({
            attribute_id, spu_id
        })
        return spuAttributes

    } catch (error) {
        console.log(`error`)
        return null
    }
}
const findAttributeBySpuId = async ({
    spu_id
}) => {
    try {
        const spuAttributes = await Spu_AttributeModel.find({
            spu_id
        })
        return spuAttributes

    } catch (error) {
        console.log(`error`)
        return null
    }
}
const serverRPCRequest = async (payload) => {
    const { type, data } = payload;
    const { products, productId } = data
    switch (type) {
        case "CHECK_PRODUCT_BY_SERVER":
            return checkProductByServer({ products })
        case "CHECK_PRODUCT_BY_ID":
            return checkProductById({ productId })
        default:
            break;
    }
}

module.exports = {
    newSpu, oneSpu,
    serverRPCRequest,
    checkProductByServer,
    PublishProduct,
    AllProducts,
    getAllProductsByfilter,
    UnPublishProduct,
    checkProductById,
    newSpuAttribute,
    findAttributeBySpuId,
    findAllProductsByCategory,
    findProductDetail

}