'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const {  ContactController} = require('../../controllers');

router.post("/findOneContact", asynchandler(ContactController.findOneContact));
router.post("/getAllContact", asynchandler(ContactController.getAllContact));
router.post("/newContact", asynchandler(ContactController.newContact));
router.post("/findIsReply", asynchandler(ContactController.findIsReply));

module.exports = router