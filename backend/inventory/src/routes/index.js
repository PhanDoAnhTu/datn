'use strict';

const { apiKey, permission } = require('../auth/checkAuth');
const { RPCObserver } = require('../utils');
const Inventoryervice = require('../services/inventory.service');

module.exports = async (app, channel) => {

    // app.use(apiKey)
    // app.use(permission('0000'))
    RPCObserver("INVENTORY_RPC", new Inventoryervice())

    app.use('/v1/inventory', require('./inventory'))


}


