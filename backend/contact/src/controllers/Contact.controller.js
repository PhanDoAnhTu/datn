
"use strict";

const ContactService = require('../services/contact.service');
const { successResponse } = require('../core');
class ContactController {

    constructor() {
        this.service = new ContactService()
    }

    newContact = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "newContact",
            metaData: await this.service.newContact(req.body),
        }).send(res);
    };

    findOneContact = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "findOneContact",
            metaData: await this.service.findOneContact(req.body),
        }).send(res);
    };
    getAllContact = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "getAllContact",
            metaData: await this.service.getAllContact(req.body),
        }).send(res);
    };


}

module.exports = new ContactController()