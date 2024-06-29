"use strict";

const { errorResponse, successResponse } = require('../core')
const bcrypt = require('bcrypt')
const { staffRepository } = require('../database');
const { StaffModel } = require('../database/models');

const { GeneratePassword, GenerateSignature, getIntoData } = require('../utils');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { verifyJWT } = require('../auth/authUtils');
const { sendEmailToken } = require('./email.service');
const { OtpModel, UserModel } = require('../database/models');
const { checkEmailToken } = require('./otp.service');

class StaffService {

    constructor() {
        this.repository = new staffRepository();
    }

    async login({ staff_email, staff_password, refreshToken = null }) {

        const foundstaff = await StaffModel.findOne({ staff_email }).lean()
        if (!foundstaff) {
            throw new errorResponse.ForbiddenRequestError("auth err");
        }
        const match = await bcrypt.compare(
            staff_password,
            foundstaff.staff_password
        );
        if (!match) {
            throw new errorResponse.ForbiddenRequestError("auth err not math");
        }
        const publicKey = await crypto.randomBytes(64).toString("hex");
        const privateKey = await crypto.randomBytes(64).toString("hex");

        const tokens = await GenerateSignature(
            { staffId: foundstaff._id, staff_email },
            publicKey,
            privateKey
        );
        await keyTokenService.createKeyToken({
            userId: foundstaff._id,
            refreshToken: tokens.refreshToken,
            publicKey,
            privateKey,
        });
        const staff = await getIntoData({
            fileds: [
                "_id",
                "staff_name",
                "staff_email",
                "staff_phone",
                "staff_sex",
                "staff_avatar",
                "staff_date_of_birth",
                "staff_provider",
            ],
            object: foundstaff,
        });
        return {
            staff,
            tokens,
        };
    }

    async logout(keyStore) {
        // console.log("keyStore_id", keyStore._id);
        const delKey = await keyTokenService.removeKeyById(keyStore._id);
        return {
            code: 201,
            message: "staff already logout",
            metaData: delKey,
        };
    }
    // const passwordHash = await GeneratePassword("admin123", 10);

    // const newCustomer = await StaffModel.create({
    //     staff_email: "outrunneradmin@gmail.com",
    //     staff_password: passwordHash,
    // });
    // return newCustomer


}

module.exports = StaffService
