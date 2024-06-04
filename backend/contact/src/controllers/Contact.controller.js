
"use strict";

const ContactService = require('../services/contact.service');
const { successResponse } = require('../core');
class ContactController {
    
    constructor() {
        this.service = new ContactService()
    }

}

module.exports = new ContactController()