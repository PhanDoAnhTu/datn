'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { discountController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

 router.post('/create', asynchandler(discountController.createDiscount))
 router.post('/discountAmount', asynchandler(discountController.discountAmount))


module.exports = router