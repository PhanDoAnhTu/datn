'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
const SpuService = require('../services/spu.service');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    RPCObserver("SPU_RPC", SpuService)

    app.use('/v1', require('./product'))
    app.use('/v1/comment', require('./comment'))
    app.use('/v1/brand', require('./brand'))
    app.use('/v1/gallery', require('./gallery'))
    app.use('/v1/attribute', require('./attribute'))
    app.use('/v1/review', require('./review'))


}


