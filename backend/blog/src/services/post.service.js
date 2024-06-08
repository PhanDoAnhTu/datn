"use strict";

const { errorResponse } = require("../core");
const { PostModel, TopicModel } = require("../database/models");
const { postRepository } = require("../database");
const { Types } = require("mongoose");
const { RPCRequest, getSelectData } = require("../utils");
const _ = require("lodash");

class PostService {
  async createPost(payload) {
    const {
      post_name,
      topic_id,
      post_short_description,
      post_image,
      post_title,
      post_content,
      isPublished = false,
    } = payload;

    try {
      const newpost = await PostModel.create({
        post_name: post_name,
        topic_id: topic_id,
        post_short_description: post_short_description,
        post_image: post_image,
        post_title: post_title,
        post_content: post_content,
        isPublished: isPublished,
      });
      return newpost;
    } catch (error) {
      return null;
    }
  }

  async getListPosts({
    limit = 10,
    page = 1,
    sort = "ctime",
    isPublished = true,
  }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const listpost = await PostModel.find({
      isPublished,
    })
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .lean();
    return listpost;
  }

  async getSinglePost({ post_slug }) {
    try {
      const post = await PostModel.findOne({
        post_slug: post_slug,
        isPublished: true,
      });

      if (!post) throw new errorResponse.NotFoundRequestError("post not found");
      const topic = await TopicModel.findOne({
        _id: post.topic_id,
        isPublished: true,
      });
      const related_posts = await PostModel.find({
        _id: { $ne: post._id },
        topic_id: post.topic_id,
        isPublished: true,
      });

      return {
        post: _.omit(post, ["__v", "updateAt"]),
        related_posts: related_posts.map((post) =>
          _.omit(post, ["__v", "updateAt"])),
        topic
      };
    } catch (error) {
      return null;
    }
  }

  async getListPostsByTopicId({
    limit = 10,
    page = 1,
    sort = "ctime",
    isPublished = true,
    topic_id,
  }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const listpost = await PostModel.find({
      topic_id,
      isPublished,
    })
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .lean();
    return listpost;
  }
}

module.exports = PostService;
