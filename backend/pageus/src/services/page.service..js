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
            const pageUs = await PageModel.find({
                page_us_slug,
                isPublished
            })
            return pageUs
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