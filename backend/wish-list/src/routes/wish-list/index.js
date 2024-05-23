'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { wishListController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/addProduct', asynchandler(wishListController.addToWishList))
router.get('/getUserWishList', asynchandler(wishListController.getUserWishList))
router.delete('/deleteToWishListItem', asynchandler(wishListController.deleteToWishListItem))
router.delete('/deleteToWishListByUserId', asynchandler(wishListController.deleteToWishListByUserId))

module.exports = router