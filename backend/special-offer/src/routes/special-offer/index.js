'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { specialOfferController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

 router.post('/createSpecialOffer', asynchandler(specialOfferController.createSpecialOffer))
 router.post('/getSpecialOfferBySpuId', asynchandler(specialOfferController.getSpecialOfferBySpuId))


module.exports = router