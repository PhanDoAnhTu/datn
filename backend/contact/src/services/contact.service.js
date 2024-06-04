'use strict';

const { errorResponse } = require("../core");
const { ContactModel } = require("../database/models");
const { ContactRepository } = require("../database");
const { Types } = require("mongoose");


class contactService {

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

module.exports = contactService