'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { brandController } = require('../../controllers');


router.post('/create', asynchandler(brandController.createBrand))
router.get('/getListBrand', asynchandler(brandController.getListBrand))




module.exports = router