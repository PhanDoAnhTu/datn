'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { attributeController } = require('../../controllers');


router.post('/newAttribute', asynchandler(attributeController.newAttribute))
router.post('/findAttributeById', asynchandler(attributeController.findAttributeById))
router.get('/findAllAttribute', asynchandler(attributeController.findAllAttribute))
router.post('/updateAttributeById', asynchandler(attributeController.updateAttributeById))
router.post('/removeAttributeById', asynchandler(attributeController.removeAttributeById))





module.exports = router