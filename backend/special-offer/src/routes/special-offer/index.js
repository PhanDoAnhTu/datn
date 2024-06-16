'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { specialOfferController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/createSpecialOffer', asynchandler(specialOfferController.createSpecialOffer))
router.post('/getSpecialOfferBySpuId', asynchandler(specialOfferController.findSpecialOfferBySpuId))
router.post('/findSpecialOfferBetweenStartDateAndEndByDate', asynchandler(specialOfferController.findSpecialOfferBetweenStartDateAndEndByDate))
router.post('/onChangeStatusSpecialOfferById', asynchandler(specialOfferController.onChangeStatusSpecialOfferById))
router.get('/getAllSpecialOffer', asynchandler(specialOfferController.getAllSpecialOffer))
router.get('/removeSpecialOfferById', asynchandler(specialOfferController.removeSpecialOfferById))


module.exports = router