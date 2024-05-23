'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
const SpecialOfferService = require('../services/special-offer.service');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    // RPCObserver("SPECIAL_OFFER_RPC", new SpecialOfferService())

    app.use('/v1', require('./special-offer'))



}


