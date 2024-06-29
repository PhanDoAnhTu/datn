"use strict";

const { errorResponse } = require("../core");
const { MenuModel } = require("../database/models");
const { MenuRepository } = require("../database");

class MenuSevice {
  async createMenu({
    menu_label,
    menu_description,
    menu_position = "navbar",
    menu_path,
    isPublished = false,
  }) {
    try {
      const menu = await MenuModel.create({
        menu_label,
        menu_description,
        menu_position,
        menu_path,
        isPublished,
      });
      return menu;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async findMenuByPosition({ menu_position = "navbar", isPublished = true }) {
    try {
      const menu = await MenuModel.find({
        menu_position,
        isPublished,
      });
      return menu;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getAllMenu() {
    const menu = await MenuModel.find();
    return menu;
  }
  async getOneMenu({ menu_id }) {
    const menu = await MenuModel.find({ _id: menu_id });
    return menu;
  }
  async updateOneMenu({
    menu_id,
    menu_label,
    menu_description,
    menu_position,
    menu_path,
  }) {
    const menu = await MenuModel.findOneAndUpdate(
      { _id: menu_id },
      { menu_label, menu_description, menu_position, menu_path },
      { new: true }
    );
    return menu;
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

module.exports = MenuSevice;
