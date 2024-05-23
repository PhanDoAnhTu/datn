'use strict';

const { errorResponse } = require("../core");
const { PostModel } = require("../database/models");
const { postRepository } = require("../database");
const { Types } = require("mongoose");
const { RPCRequest, getSelectData } = require("../utils");


class PostService {
    async createPost(payload) {
        const {
            post_name,
            topic_id,
            post_short_description,
            post_image = [],
            post_title,
            post_content,
            isPublished = false } = payload

       try {
        const newpost = await PostModel.create({
            post_name: post_name,
            topic_id: topic_id,
            post_short_description: post_short_description,
            post_image: post_image,
            post_title: post_title,
            post_content: post_content,
            isPublished: isPublished

        })
        return newpost
       } catch (error) {
        return null
       }
    }

    async getListPosts({ sort, isPublished = true, select =[]}) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listpost = await PostModel.find({
            isPublished
        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return listpost
    }

}

module.exports = PostService