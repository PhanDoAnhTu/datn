'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { orderController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/checkoutReview', asynchandler(orderController.checkoutReview))



module.exports = router