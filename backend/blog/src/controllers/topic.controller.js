"use strict";

const TopicService = require("../services/topic.service");
const { successResponse } = require("../core");
class TopicController {
  constructor() {
    this.service = new TopicService();
  }
  createTopic = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "created new topic success",
      metaData: await this.service.createTopic(req.body),
    }).send(res);
  };
  getListTopic = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getListTopic success",
      metaData: await this.service.getListTopic(req.body),
    }).send(res);
  };
  getOneTopic = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getOneTopic success",
      metaData: await this.service.getOneTopic(req.body),
    }).send(res);
  };
  updateOneTopic = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "updateOneTopic success",
      metaData: await this.service.updateOneTopic(req.body),
    }).send(res);
  };
  getListTopicByParentId = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "getListTopicByParentId success",
      metaData: await this.service.getListTopicByParentId(req.body),
    }).send(res);
  };

  changeIsPublished = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "changeIsPublished success",
      metaData: await this.service.changeIsPublished(req.body),
    }).send(res);
  };
  isTrashTopic = async (req, res, next) => {
    return new successResponse.SuccessResponse({
      message: "isTrashTopic success",
      metaData: await this.service.isTrashTopic(req.body),
    }).send(res);
  };
}

module.exports = new TopicController();
