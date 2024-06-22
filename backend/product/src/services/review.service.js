'use strict'

// const { RPCRequest } = require("../../../user/src/utils")
const { ReviewModel } = require("../database/models")

class ReviewService {
    async createReview({
        isPublished = true,
        customer_id,
        order_id,
        product_id,
        sku_id,
        rating_score,
        rating_content,
        images = [] }) {

        const review = await ReviewModel.create({
            isPublished,
            customer_id,
            order_id,
            product_id,
            sku_id,
            rating_score,
            rating_content,
            images
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
        let list_review = await ReviewModel.find({
            isPublished,
            product_id
        }).lean()

        // const reviews = list_review.map(async (review) => {
        //     const user = await RPCRequest("CUSTOMER_RPC", {
        //         type: "FIND_CUSTOMER_BY_ID",
        //         data: {
        //             customer_id: review.customer_id,
        //         },
        //     });
        //     return { ...review, user: user }
        // })

        return list_review
    }
}
module.exports = new ReviewService