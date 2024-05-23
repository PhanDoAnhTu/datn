"use strict";

const { errorResponse, successResponse } = require('../core')
const bcrypt = require('bcrypt')
const { staffRepository } = require('../database');
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

    
}

module.exports = StaffService
