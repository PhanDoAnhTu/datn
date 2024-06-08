const { Types } = require('mongoose');
const { errorResponse } = require('../core');
const { commentRepository } = require('../database');
const { CommentModel } = require('../database/models');
const spuService = require('./spu.service');
const { RPCRequest } = require('../utils');


class CommentService {
    constructor() {
        this.repository = new commentRepository();
    }

   static async createComment({ productId, userId, content, parentCommentId = null }) {

        const comment = new CommentModel({
            comment_productId: productId,
            comment_userId: userId, comment_content: content, comment_parentId: parentCommentId
        })
        let rightValue
        if (parentCommentId) {
            // reply comment
            const parentComment = await CommentModel.findOne({ _id: parentCommentId })
            if (!parentComment) throw new errorResponse.NotFoundRequestError("parent comment not found")
            rightValue = parentComment.comment_right
            await CommentModel.updateMany(
                {
                    comment_productId: Types.ObjectId(productId),
                    comment_right: { $gte: rightValue }
                }, {
                $inc: { comment_right: 2 }
            }
            )
            await CommentModel.updateMany(
                {
                    comment_productId: Types.ObjectId(productId),
                    comment_left: { $gte: rightValue }
                }, {
                $inc: { comment_left: 2 }
            }
            )
        } else {
            const maxRightValue = await CommentModel.findOne({
                comment_productId: Types.ObjectId(productId),
            }, 'comment_right', { sort: { comment_right: -1 } })
            if (maxRightValue) {
                rightValue = maxRightValue.right + 1
            } else {
                rightValue = 1
            }
        }
        // insert to comemnt
        comment.comment_left = rightValue
        comment.comment_right = rightValue + 1
        await comment.save()

        return comment
    }

    async getCommentByParentId({ productId, parentCommentId = null, limit = 50, offset = 0 }) {
        if (parentCommentId) {
            const parent = await CommentModel.findOne({ _id: Types.ObjectId(parentCommentId) })
            const comments = await CommentModel.find({
                comment_productId: productId,
                comment_left: { $gt: parent.comment_left },
                comment_right: { $lt: parent.comment_right }
            }).select({
                comment_left: 1,
                comment_right: 1,
                comment_content: 1,
                parentCommentId: 1
            }).sort({
                comment_left: 1
            })
            console.log(comments)

            return comments
        }
        const comments = await CommentModel.find({
            comment_productId: productId,
            comment_parentId: parentCommentId
        }).select({
            comment_left: 1,
            comment_right: 1,
            comment_content: 1,
            parentCommentId: 1
        }).sort({
            comment_left: 1
        }).limit(limit)
        return comments
    }
    async getCommentByproductId({ productId, limit = 50, offset = 0 }) {
        const comments = await CommentModel.find({
            comment_productId: productId,
        }).limit(limit).lean()

        if (comments.length == 0) {
            return comments
        }
        let user_list = []
        for (let index = 0; index < comments.length; index++) {
            const user = await RPCRequest("CUSTOMER_RPC", {
                type: "FIND_CUSTOMER_BY_ID",
                data: {
                    customer_id: comments[index].comment_userId
                }
            })
            user_list.push(user)
        }
        const comments_info = await comments.map((comment, index) => {
            return { ...comment, user: user_list[index] }
        })
        return comments_info
    }
    async deleteCommentByIdAndProductId({ commentId, productId }) {
        const foundProduct = await spuService.checkProductById({ productId })
        if (!foundProduct) throw new errorResponse.NotFoundRequestError("not found product")

        const foundComment = await CommentModel.findOne({ _id: commentId }).lean()
        if (!foundComment) throw new errorResponse.NotFoundRequestError("not found comment")
        const leftValue = foundComment.comment_left
        const rightValue = foundComment.comment_right
        //with
        const width = rightValue - leftValue + 1
        //delete all child comment 

        await CommentModel.deleteMany({
            comment_productId: Types.ObjectId(productId),
            comment_left: { $gte: leftValue, $lte: rightValue }
        })

        //update
        await CommentModel.updateMany({
            comment_productId: Types.ObjectId(productId),
            comment_right: { $gt: rightValue }

        }, {
            $inc: {
                comment_right: -width
            }
        })
        return true

    }


}

module.exports = new CommentService()