'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { SliderController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/createSlider', asynchandler(SliderController.createSlider))
router.post('/getAllSliderByActive', asynchandler(SliderController.getAllSliderByActive))
router.post('/changeActive', asynchandler(SliderController.changeActive))
router.post('/isTrash', asynchandler(SliderController.isTrash))
router.get('/getAllSlider', asynchandler(SliderController.getAllSlider))


module.exports = router