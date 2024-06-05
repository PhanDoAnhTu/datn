
"use strict";

const PageService = require('../services/page.service.');
const { successResponse } = require('../core');
class PageController {
    
    constructor() {
        this.service = new PageService()
    }
    createPageUs = async (req, res, next) => {
        new successResponse.SuccessResponse({
          message: "createPageUs success",
          metaData: await this.service.createPageUs(req.body),
        }).send(res);
      };
      findPageusBySlug = async (req, res, next) => {
        new successResponse.SuccessResponse({
          message: "findPageusBySlug success",
          metaData: await this.service.findPageusBySlug(req.body),
        }).send(res);
      };
}

module.exports = new PageController()