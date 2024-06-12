'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { cartController } = require('../../controllers');
// const { authentication } = require('../../auth/authUtils');

router.post('/addTocart', asynchandler(cartController.addToCart))
router.post('/updateQuantityFromCart', asynchandler(cartController.updateQuantityFromCart))
router.post('/updateSkuFromCart', asynchandler(cartController.updateSkuFromCart))
router.post('/updateSkuFromCartV2', asynchandler(cartController.updateSkuFromCartV2))
router.post('/deleteToCartItem', asynchandler(cartController.deleteToCartItem))
router.post('/deleteToCartByCartIdAndUserId', asynchandler(cartController.deleteToCartByCartIdAndUserId))
router.post('/findUserCart', asynchandler(cartController.findUserCart))



module.exports = router