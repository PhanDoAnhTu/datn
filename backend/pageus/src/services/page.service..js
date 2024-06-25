'use strict';

const { errorResponse } = require("../core");
const { PageModel } = require("../database/models");
const { PageRepository } = require("../database");


class pageService {

    async createPageUs({
        page_us_name,
        page_us_detail,
        page_us_title,
        page_us_icon = null,
        isPublished = false,
        page_us_image = null
    }) {
        try {
            const pageUs = await PageModel.create({
                page_us_name,
                page_us_detail,
                page_us_title,
                page_us_icon,
                page_us_image,
                isPublished,
            })
            return pageUs
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async findPageusBySlug({ page_us_slug, isPublished = true }) {
        try {
            const pageUs = await PageModel.findOne({
                page_us_slug,
                isPublished
            })
            return pageUs
        } catch (error) {
            console.log(error)
            return null
        }

    }
    async findPageusById({ page_id, isPublished = true }) {
        try {
            const pageUs = await PageModel.findOne({
                _id: page_id,
                isPublished
            })
            return pageUs
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getAllPageus({ isPublished = true, limit = 50, page = 1, sort = 'ctime' }) {
        const skip = (page - 1) * limit;
        const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
        const contact = await PageModel.find({
            isPublished
        }).sort(sortBy).limit(limit).skip(skip).lean()

        return contact
    }


    async isPublished({ page_id, isPublished = true }) {
        try {
            const pageUs = await PageModel.findOne({
                _id: page_id
            })
            pageUs.isPublished = isPublished

            return await pageUs.updateOne(pageUs)
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // async serverRPCRequest(payload) {
    //     const { type, data } = payload;
    //     const { } = data
    //     switch (type) {
    //         case "":
    //         default:
    //             break;
    //     }
    // }
}

module.exports = pageService