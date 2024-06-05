'use strict';

const { errorResponse } = require("../core");
const { MenuModel } = require("../database/models");
const { MenuRepository } = require("../database");


class MenuSevice {
    async createMenu({
        menu_label,
        menu_description,
        menu_position = "navbar",
        menu_icon = "",
        isPublished = false,
    }) {
        try {
            const menu = await MenuModel.create({
                menu_label,
                menu_description,
                menu_position,
                menu_icon,
                isPublished
            })
            return menu
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async findMenuByPosition({ menu_position = "navbar", isPublished = true }) {
        try {
            const menu = await MenuModel.find({
                menu_position,
                isPublished
            })
            return menu
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

module.exports = MenuSevice