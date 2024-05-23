
"use strict";

const CommentService = require('../services/comment.service');
const { successResponse } = require('../core');
class commentController {

    createComment = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "created new comment",
            metaData: await CommentService.createComment(req.body)
        }).send(res)
    }

    getCommentByParentId = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "get comment by parent id success",
            metaData: await CommentService.getCommentByParentId(req.body)
        }).send(res)
    }
    deleteCommentByIdAndProductId = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "delete comment success",
            metaData: await CommentService.deleteCommentByIdAndProductId(req.body)
        }).send(res)
    }

}

module.exports = new commentController()