'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const {templateController  } = require('../../controllers');


router.post('/create', asynchandler(templateController.newTemplate))


module.exports = router