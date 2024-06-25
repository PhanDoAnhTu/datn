'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { discountController } = require('../../controllers');
// const { authentication } = require('../../auth/authUtils');

 router.post('/create', asynchandler(discountController.createDiscount))
 router.post('/discountAmount', asynchandler(discountController.discountAmount))
 router.post('/getAllDiscount', asynchandler(discountController.getAllDiscount))
 router.post('/findOneDiscount', asynchandler(discountController.findOneDiscount))
 router.post('/changeIsActiveDiscount', asynchandler(discountController.changeIsActiveDiscount))
 router.post('/deleteDiscountCode', asynchandler(discountController.deleteDiscountCode))
 router.post('/isTrashDiscount', asynchandler(discountController.isTrashDiscount))

module.exports = router