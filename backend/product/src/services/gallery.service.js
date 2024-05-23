'use strict'
const { GalleryModel } = require("../database/models")

const addImage = async ({ spu_id, sku_id, thumb_url, public_id }) => {
    const image = await GalleryModel.create({
        spu_id,
        sku_id,
        thumb_url,
        public_id
    })

    return image
}

const ListImageByProductId = async ({ product_id }) => {
    const image = await GalleryModel.find({
        spu_id: product_id
    })
    return image
}

module.exports = {
    addImage,
    ListImageByProductId
}