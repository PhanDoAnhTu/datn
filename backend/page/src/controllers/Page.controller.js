
"use strict";

const PageService = require('../services/page.service.');
const { successResponse } = require('../core');
class PageController {
    
    constructor() {
        this.service = new PageService()
    }

}

module.exports = new PageController()