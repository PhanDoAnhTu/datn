"use strict";

const { Types } = require('mongoose');
const { SpuModel } = require('../models');


const getProductById = async ({ productId }) => {
    const product = await SpuModel.findOne({ _id:productId}).lean()
    return product
}
const checkProductByServer = async ({ products }) => {
    return await Promise.all(products.map(async product => {
        const foundProduct = await this.getProductById(product.productId)
        if (foundProduct) {
            return {
                price: foundProduct.product_price,
                quantity: product.quantity,
                productId: product.productId
            }
        }
    }))
}
const publishProduct = async ({ product_id }) => {

    const foundProduct = await SpuModel.findOne({
        _id: new Types.ObjectId(product_id)
    })
    if (!foundProduct) return null
    foundProduct.isDraft = false
    foundProduct.isPublished = true

    console.log(foundProduct)

    const { modifiedCount } = await foundProduct.updateOne(foundProduct)
    return modifiedCount
}

const unPublishProduct = async ({ product_id }) => {
    const foundProduct = await SpuModel.findOne({
        _id: new Types.ObjectId(product_id)
    })
    if (!foundProduct) return null
    foundProduct.isDraft = true
    foundProduct.isPublished = false

    console.log(foundProduct)

    const { modifiedCount } = await foundProduct.updateOne(foundProduct)
    return modifiedCount

}
const getAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await SpuModel.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        // .select(getSelectData(select))
        .lean()
    return products
}



module.exports = {
checkProductByServer, publishProduct, unPublishProduct, getAllProducts,getProductById
}