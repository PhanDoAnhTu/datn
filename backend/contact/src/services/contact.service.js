'use strict';

const { errorResponse } = require("../core");
const { ContactModel } = require("../database/models");
const { ContactRepository } = require("../database");
const { Types } = require("mongoose");


class contactService {
    async newContact({
        reply_id = null,
        reply_by = "0",
        customer_email,
        contact_title,
        contact_content }) {
        const contact = await ContactModel.create({
            reply_id,
            reply_by,
            customer_email,
            contact_title,
            contact_content
        })
        return contact
    }

    async getAllContact({limit = 50, page = 1, sort = 'ctime' }) {
        const skip = (page - 1) * limit;
        const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
        const contact = await ContactModel.find({
            isPublished
        }).sort(sortBy).limit(limit).skip(skip).lean()

        return contact
    }
    async findOneContact({ contact_id }) {
        const contact = await ContactModel.findOne({
            isPublished, _id: contact_id
        }).lean()
        return contact
    }

    async findIsReply({ isReply = false }) {
        const contact = await ContactModel.find({
            isPublished, _id: isReply
        }).lean()
        return contact
    }

}

module.exports = contactService