'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { attributeController } = require('../../controllers');


router.post('/newAttribute', asynchandler(attributeController.newAttribute))
router.post('/findAttributeById', asynchandler(attributeController.findAttributeById))





module.exports = router