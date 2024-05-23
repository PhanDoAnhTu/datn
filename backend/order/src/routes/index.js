'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    // RPCObserver("ORDER_RPC", )

    app.use('/v1/order', require('./order'))



}


