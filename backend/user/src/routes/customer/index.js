'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { customerController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.get('/welcome', asynchandler(customerController.checkLoginEmailToken))
router.post('/signup', asynchandler(customerController.signUp))
router.post('/login', asynchandler(customerController.login))

///authentication
router.use(authentication)

router.post('/logout', asynchandler(customerController.logout))
router.post('/handlerRefreshToken', asynchandler(customerController.handlerRefreshToken))


module.exports = router