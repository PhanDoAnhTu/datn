'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    // RPCObserver("SPECIAL_OFFER_RPC", new SpecialOfferService())

    app.use('/v1', require('./category'))



}


