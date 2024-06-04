'use strict';

const { errorResponse } = require("../core");
const { SliderModel } = require("../database/models");
const { SliderRepository } = require("../database");
const { Types } = require("mongoose");


class SliderService {
    createSlider = async ({ slider_name, slider_link, slider_description, slider_summary, slider_position, slider_image, slider_is_active = false }) => {
        try {
            const slider = await SliderModel.create({
                slider_name, slider_link, slider_description, slider_summary, slider_position, slider_image, slider_is_active
            })
            return slider
        } catch (error) {
            console.log(error)
            return null
        }
    }
    getAllSliderByActive = async ({ slider_is_active = true }) => {
        try {
            const slider = await SliderModel.find({
                slider_is_active
            })
            return slider
        } catch (error) {
            console.log(error)
            return []
        }
    }

    // async serverRPCRequest(payload) {
    //     const { type, data } = payload;
    //     const { } = data
    //     switch (type) {
    //         case "":
    //         default:
    //             break;
    //     }
    // }
}

module.exports = SliderService