'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
const OrderService = require('../services/order.service')
module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    // RPCObserver("ORDER_RPC", )
    RPCObserver("ORDER_RPC", new OrderService())

    app.use('/v1/order', require('./order'))



}


