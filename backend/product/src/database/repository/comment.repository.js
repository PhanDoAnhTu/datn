"use strict";

const { CommentModel } = require('../models');

class CommentRepository {
    async findById(id) {
        return await CommentModel.findById({ id }).lean()
    }
}

module.exports = CommentRepository;