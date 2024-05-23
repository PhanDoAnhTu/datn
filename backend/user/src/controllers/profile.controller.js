
"use strict";

const ProfileService = require('../services/profile.service');
const { successResponse } = require('../core');

const dataProfiles = [
    {
        user_id: 1,
        user_name: "a1",
        user_avt: "img1"
    },
    {
        user_id: 2,
        user_name: "a2",
        user_avt: "img2"
    },
    {
        user_id: 3,
        user_name: "a3",
        user_avt: "img3"
    },
]
class profileController {


    profiles = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "profiles",
            metaData: dataProfiles
        }).send(res)
    }
    profile = async (req, res, next) => {
        return new successResponse.SuccessResponse({
            message: "profile",
            metaData: {
                user_id: 2,
                user_name: "a2",
                user_avt: "img2"
            }
        }).send(res)
    }




}

module.exports = new profileController()