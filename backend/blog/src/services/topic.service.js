"use strict";

const { errorResponse } = require("../core");
const { TopicModel } = require("../database/models");
const { topicRepository } = require("../database");
const { Types } = require("mongoose");
const { RPCRequest, getSelectData } = require("../utils");

class TopicService {
  async createTopic(payload) {
    const {
      topic_parent_id = null,
      topic_name,
      topic_description,
      topic_image,
      isPublished = false,
    } = payload;

    const newTopic = await TopicModel.create({
      topic_parent_id: topic_parent_id,
      topic_name: topic_name,
      topic_description: topic_description,
      topic_image: topic_image,
      isPublished: isPublished,
    });
    return newTopic;
  }
  async getListTopic({
    limit = 10,
    page = 1,
    sort = "ctime",
    isPublished = true,
  }) {
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const skip = (page - 1) * limit;

    const listTopic = await TopicModel.find({
      isPublished,
    })
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .lean();
    return listTopic;
  }

  async getListTopicByParentId({
    limit = 10,
    page = 1,
    sort = "ctime",
    isPublished = true,
    topic_parent_id = null,
  }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const listTopicByParentId = await TopicModel.find({
      isPublished,
      topic_parent_id: topic_parent_id,
    })
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .lean();
    return listTopicByParentId;
  }
}

module.exports = TopicService;
