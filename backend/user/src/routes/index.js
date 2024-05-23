'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const CustomerService = require('../services/customer.service');
const { RPCObserver } = require('../utils');

module.exports = async (app, channel) => {
    // app.use(apiKey)
    // app.use(permission('0000'))
    //listen event

    RPCObserver("CUSTOMER_RPC", new CustomerService())
    //routes
    app.use('/v1/customer', require('./customer'))
    // app.use('/v1/api/staff', require('./staff'))
    app.use('/v1/rbac', require('./rbac'))
    app.use('/v1/profile', require('./profile'))
    app.use('/v1/template', require('./template'))

}

