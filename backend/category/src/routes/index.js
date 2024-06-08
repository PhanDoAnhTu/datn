'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
const CategoryService = require('../services/category.service')
module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    RPCObserver("CATEGORY_RPC", new CategoryService())

    app.use('/v1', require('./category'))



}


