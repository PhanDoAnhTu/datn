'use strict'
const { Types } = require('mongoose')
const { SkuModel } = require('../database/models')
const _ = require('lodash')


const newSku = async ({
    spu_id, sku_list
}) => {
    try {
        const convert_sku_list = await sku_list.map(sku => {
            const { thumb_url, public_id, ...skuNoImage } = sku;
            return { ...skuNoImage, product_id: spu_id }

        })
         console.log("convert_sku_list",convert_sku_list)

        const skus = await SkuModel.create(convert_sku_list)
        console.log("skus///////////////////////////////////////////////",skus)

        return skus

    } catch (error) {
        return []
    }
}

const oneSku = async ({ sku_id, product_id }) => {
    try {
        const sku = await SkuModel.findOne({ sku_id, product_id }).lean()
        // if(sku){

        // }
        console.log(sku)
        return _.omit(sku, ['__v', 'updateAt', 'createAt', 'isDeleted'])

    } catch (error) {
        return null
    }
}

const allSkuBySpuId = async ({ product_id }) => {
    try {
        const skus = await SkuModel.find({ product_id: Types.ObjectId(product_id) }).lean()
        console.log(skus)
        return skus

    } catch (error) {

    }
}
const serverRPCRequest = async (payload) => {
    const { type, data } = payload;
    const { } = data
    switch (type) {
        case "GET_SKU_BY_ID":
        default:
            break;
    }
}
module.exports = {
    newSku, oneSku, allSkuBySpuId, serverRPCRequest
}