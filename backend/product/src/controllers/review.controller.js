'use strict'
const { successResponse } = require("../core")
const ReviewService = require("../services/review.service")

class ReviewController {
    constructor() {
        this.service = ReviewService
    }
    createReview = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'createReview success',
            metaData: await this.service.createReview(req.body)
        }).send(res)
    }

    listReview = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'ListReview success',
            metaData: await this.service.listReview(req.body)
        }).send(res)
    }
    findReviewByProductId = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'findReviewByProductId success',
            metaData: await this.service.findReviewByProductId(req.body)
        }).send(res)
    }
    findReviewById = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'findReviewByProductId success',
            metaData: await this.service.findReviewById(req.body)
        }).send(res)
    }
}
module.exports = new ReviewController;