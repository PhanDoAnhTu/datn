'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
// const CartService = require('../services/cart.service');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    // RPCObserver("_RPC", new CartService())

    app.use('/v1/post', require('./post'))
    app.use('/v1/topic', require('./topic'))



}


