
"use strict";

const SliderService = require('../services/slider.service');
const { successResponse } = require('../core');
class SliderController {
    
    constructor() {
        this.service = new SliderService()
    }
    createSlider = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'createSlider success',
            metaData: await this.service.createSlider(req.body)
        }).send(res)
    }
    getAllSliderByActive = async (req, res, next) => {
        new successResponse.SuccessResponse({
            message: 'getAllSliderByActive success',
            metaData: await this.service.getAllSliderByActive(req.body)
        }).send(res)
    }
}

module.exports = new SliderController()