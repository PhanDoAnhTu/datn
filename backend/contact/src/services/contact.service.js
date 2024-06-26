"use strict";

const { errorResponse } = require("../core");
const { ContactModel } = require("../database/models");
const { ContactRepository } = require("../database");
const mongoose = require("mongoose");

class contactService {
  async newContact({
    reply_by = "0",
    isReply = false,
    customer_email,
    contact_title,
    customer_name,
    contact_content,
  }) {
    const contact = await ContactModel.create({
      reply_by,
      isReply,
      customer_email,
      contact_title,
      customer_name,
      contact_content,
    });
    return contact;
  }

  async updateOneContact({ contact_id, reply_by = 1 }) {
    try {
      const date = new Date();
      const contact = await ContactModel.findOneAndUpdate(
        { _id: contact_id },
        { isReply: true, reply_by: reply_by, modifiedOn: date },
        { new: true }
      ).lean();
      return contact;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllContact({ limit = 50, page = 1, sort = "ctime" }) {
    const skip = (page - 1) * limit;
    const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
    const contact = await ContactModel.find()
      .sort(sortBy)
      .limit(limit)
      .skip(skip)
      .lean();

    return contact;
  }
  async findOneContact({ contact_id }) {
    const contact = await ContactModel.findOne({
      _id: contact_id,
    }).lean();
    return contact;
  }

  async findIsReply({ isReply = false }) {
    const contact = await ContactModel.find({
      isPublished,
      _id: isReply,
    }).lean();
    return contact;
  }
}

module.exports = contactService;
