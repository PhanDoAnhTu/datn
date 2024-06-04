'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { PageController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');


module.exports = router