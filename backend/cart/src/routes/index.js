'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
const CartService = require('../services/cart.service');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    RPCObserver("CART_RPC", new CartService())

    app.use('/v1', require('./cart'))



}


