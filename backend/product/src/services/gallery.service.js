'use strict'
const { GalleryModel } = require("../database/models")

const addImageBySkuList = async ({ spu_id, sku_id, thumb_url = null, public_id = null }) => {
    const image = await GalleryModel.create({
        spu_id,
        sku_id,
        thumb_url,
        public_id
    })

    return image
}

const addImageBySpuId = async ({ spu_id, thumb_url = null, public_id = null }) => {
    const image = await GalleryModel.create({
        spu_id,
        sku_id: null,
        thumb_url,
        public_id
    })

    return image
}

const ListImageByProductId = async ({ product_id }) => {
    const image = await GalleryModel.find({
        spu_id: product_id
    }).lean()
    return image
}

module.exports = {
    addImageBySkuList,
    addImageBySpuId,
    ListImageByProductId
}