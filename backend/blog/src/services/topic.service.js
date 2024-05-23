'use strict';

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
            topic_image = [],
            isPublished = false
        } = payload

        const newTopic = await TopicModel.create({
            topic_parent_id: topic_parent_id,
            topic_name: topic_name,
            topic_description: topic_description,
            topic_image: topic_image,
            isPublished: isPublished
        })
        return newTopic

    }
    async getListTopic({ sort = "ctime", isPublished = true, select =[]}) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }

        const listTopic = await TopicModel.find({
            isPublished
        }).select(getSelectData(select))
            .sort(sortBy)
            .lean()
        return listTopic
    }

    async getListTopicByParentId({ sort='ctime', isPublished = true, topic_parent_id=null, select=[] }) {
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
        const listTopicByParentId = await TopicModel.find({
            isPublished,
            topic_parent_id: topic_parent_id
        }).sort(sortBy)
            .select(getSelectData(select))
            .lean()
        return listTopicByParentId
    }

}

module.exports = TopicService