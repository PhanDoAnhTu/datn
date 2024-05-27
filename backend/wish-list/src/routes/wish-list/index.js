'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { wishListController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/addProduct', asynchandler(wishListController.addToWishList))
router.post('/getUserWishList', asynchandler(wishListController.getUserWishList))
router.post('/removeWishListItem', asynchandler(wishListController.removeWishListItem))
router.post('/deleteToWishListByUserId', asynchandler(wishListController.deleteToWishListByUserId))

module.exports = router