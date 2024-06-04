'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { SliderController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/createSlider', asynchandler(SliderController.createSlider))
router.post('/getAllSliderByActive', asynchandler(SliderController.getAllSliderByActive))


module.exports = router