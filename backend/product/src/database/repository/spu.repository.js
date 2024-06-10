"use strict";

const { Types } = require('mongoose');
const { SpuModel } = require('../models');


const getProductById = async ({ productId }) => {
    const product = await SpuModel.findOne({ _id: productId, isPublished: true }).lean()
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
const getAllProductsByfilter = async ({ limit, sort, page, filter }) => {
    // const { isPublished } = filter

    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await SpuModel.find(filter )
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .lean()
    return products
}
const findProductsByCategory = async ({ limit, sort, page, filter }) => {
    const { category_id, isPublished } = filter
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    if (!category_id) {
        const products = await SpuModel.find({
            isPublished
        })
            .sort(sortBy)
            .lean()
        return products
    }
    const products_category = await SpuModel.find({
        isPublished,
        product_category: {
            $in: [category_id]
        }
    }).sort(sortBy)
        .skip(skip)
        .limit(limit)
        .lean()
    return products_category
}
const getAllProducts = async ({ sort, isPublished }) => {
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
    const products = await SpuModel.find({ isPublished })
        .sort(sortBy)
        .lean()
    return products
}


module.exports = {
    checkProductByServer, publishProduct, unPublishProduct, getAllProducts, getProductById, getAllProductsByfilter, findProductsByCategory
}