'use strict'

const { ReviewModel } = require("../database/models")

class ReviewService {
    async createReview({
        isPublished = true,
        customer_id,
        order_id,
        product_id,
        sku_id,
        rating_score,
        rating_content }) {

        const review = await ReviewModel.create({
            isPublished,
            customer_id,
            order_id,
            product_id,
            sku_id,
            rating_score,
            rating_content
        })
        return review
    }


    async listReview({ isPublished = true }) {
        const list_review = await ReviewModel.find({
            isPublished
        })

        return list_review
    }
    async findReviewById({ review_id, isPublished = true }) {
        const review = await ReviewModel.findOne({
            isPublished,
            _id: review_id
        })

        return review
    }

    async findReviewByProductId({ product_id, isPublished = true }) {
        const list_review = await ReviewModel.find({
            isPublished,
            product_id
        })
        return list_review
    }
}
module.exports = new ReviewService