'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    app.use('/v1/wish-list', require('./wish-list'))



}


