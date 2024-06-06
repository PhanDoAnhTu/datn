'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { BrandController } = require('../../controllers');
// const { authentication } = require('../../auth/authUtils');


router.post("/createBrand", asynchandler(BrandController.createBrand));
router.post("/findBrandByPosition", asynchandler(BrandController.findBrandByPosition));


module.exports = router