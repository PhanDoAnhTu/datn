'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
const DiscountService = require('../services/discount.service');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    RPCObserver("DISCOUNT_RPC", new DiscountService())

    app.use('/v1', require('./discount'))



}


