"use strict";

const { Types } = require('mongoose');
const { CartModel } = require('../models');


const findCartById = async (cartId) => {
    const existingCart = await CartModel.findOne({ _id: Types.ObjectId(cartId) }).lean()
    return existingCart;
}


module.exports = {
    findCartById
}
