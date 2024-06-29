'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { staffController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

// router.post('/signup', asynchandler(staffController.signUp))
router.post('/login', asynchandler(staffController.login))

///authentication
router.use(authentication)

router.post('/logout', asynchandler(staffController.logout))

module.exports = router