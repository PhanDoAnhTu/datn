'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { MenuController } = require('../../controllers');
// const { authentication } = require('../../auth/authUtils');


router.post("/createMenu", asynchandler(MenuController.createMenu));
router.post("/findMenuByPosition", asynchandler(MenuController.findMenuByPosition));


module.exports = router