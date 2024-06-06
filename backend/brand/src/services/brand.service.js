'use strict';

const { errorResponse } = require("../core");
const { BrandModel } = require("../database/models");
const { BrandRepository } = require("../database");


class BrandSevice {
    async createBrand({
        Brand_label,
        Brand_description,
        Brand_position = "navbar",
        Brand_icon = "",
        isPublished = false,
    }) {
        try {
            const Brand = await BrandModel.create({
                Brand_label,
                Brand_description,
                Brand_position,
                Brand_icon,
                isPublished
            })
            return Brand
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async findBrandByPosition({ Brand_position = "navbar", isPublished = true }) {
        try {
            const Brand = await BrandModel.find({
                Brand_position,
                isPublished
            })
            return Brand
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

module.exports = BrandSevice