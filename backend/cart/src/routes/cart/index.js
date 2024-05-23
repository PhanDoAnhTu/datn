'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { cartController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/addTocart', asynchandler(cartController.addToCart))
router.post('/updateToCart', asynchandler(cartController.updateToCart))
router.post('/deleteToCartItem', asynchandler(cartController.deleteToCartItem))
router.post('/deleteToCartByCartIdAndUserId', asynchandler(cartController.deleteToCartByCartIdAndUserId))
router.post('/listByUserId', asynchandler(cartController.listToCart))



module.exports = router