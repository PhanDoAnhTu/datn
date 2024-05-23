'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { inventoryController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');


router.post('/addStockInventory',asynchandler(inventoryController.addStockInventory))


module.exports = router