
"use strict";

const TopicService = require('../services/topic.service');
const { successResponse } = require('../core');
class TopicController {
    constructor() {
        this.service = new TopicService()
    }
    createTopic = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "created new topic success",
            metaData: await this.service.createTopic(req.body)
        }).send(res)
    }
    getListTopic = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "getListTopic success",
            metaData: await this.service.getListTopic(req.body)
        }).send(res)
    }
    getListTopicByParentId = async (req, res, next) => {

        return new successResponse.SuccessResponse({
            message: "getListTopicByParentId success",
            metaData: await this.service.getListTopicByParentId(req.body)
        }).send(res)
    }

}

module.exports = new TopicController()