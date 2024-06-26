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
      topic_image = null,
      isPublished = false,
      isDraft = false,
    } = payload;

    const newTopic = await TopicModel.create({
      topic_parent_id: topic_parent_id,
      topic_name: topic_name,
      topic_description: topic_description,
      topic_image: topic_image,
      isPublished: isPublished,
      isDraft: isDraft,
    });
    return newTopic;
  }
  async getListTopic({ limit = 10, page = 1, sort = "ctime", isPublished }) {
    if (isPublished) {
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
    } else {
      const listTopic = await TopicModel.find().lean();
      return listTopic;
    }
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
  async changeIsPublished({ isPublished = true, topic_id }) {
    const topic = await TopicModel.findOne({
      _id: topic_id,
    });
    if (isPublished == true) {
      topic.isDraft = false;
      topic.isDeleted = false;
    }
    if (isPublished == false) {
      topic.isDraft = true;
      topic.isDeleted = false;
    }
    topic.isPublished = isPublished;

    return await topic.updateOne(topic);
  }

  async getOneTopic({ topic_id }) {
    try {
      const topic = await TopicModel.findOne({
        _id: topic_id,
      });
      return topic;
    } catch (error) {
      console.log(error);
    }
  }
  async updateOneTopic({ topic_id, topic_name, topic_description }) {
    try {
      const topic = await TopicModel.findOneAndUpdate(
        {
          _id: topic_id,
        },
        { topic_name: topic_name, topic_description: topic_description },
        { new: true }
      );
      return topic;
    } catch (error) {
      console.log(error);
    }
  }

  async isTrashTopic({ isDeleted = true, topic_id }) {
    const topic = await TopicModel.findOne({
      _id: topic_id,
    });
    if (isDeleted == true) {
      topic.isDraft = false;
      topic.isPublished = false;
    }
    if (isDeleted == false) {
      topic.isDraft = true;
      topic.isPublished = false;
    }
    topic.isDeleted = isDeleted;

    return await topic.updateOne(topic);
  }
}

module.exports = TopicService;
