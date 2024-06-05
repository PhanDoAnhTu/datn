"use strict";

const PostService = require("../services/post.service");
const { successResponse } = require("../core");
class PostController {
  constructor() {
    this.service = new PostService();
  }

  createPost = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "created new post success",
      metaData: await this.service.createPost(req.body),
    }).send(res);
  };

  getListPosts = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getListPosts success",
      metaData: await this.service.getListPosts(req.body),
    }).send(res);
  };
  getListPostsByTopicId = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getListPostsBytipicId success",
      metaData: await this.service.getListPostsByTopicId(req.body),
    }).send(res);
  };
  getSinglePost = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getSinglePost success",
      metaData: await this.service.getSinglePost(req.body),
    }).send(res);
  };
}

module.exports = new PostController();
