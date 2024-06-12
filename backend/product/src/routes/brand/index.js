'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { brandController } = require('../../controllers');


router.post('/create', asynchandler(brandController.createBrand))
router.post('/findListBrand', asynchandler(brandController.getListBrand))
router.get('/findBrandById', asynchandler(brandController.findBrandById))




module.exports = router