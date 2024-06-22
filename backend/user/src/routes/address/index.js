'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { addressController } = require('../../controllers');

router.post('/CreateAddress', asynchandler(addressController.CreateAddress))
router.post('/removeAddress', asynchandler(addressController.removeAddress))
router.post('/getAddressByCustomerId', asynchandler(addressController.getAddressByCustomerId))
router.post('/isDefaultAddress', asynchandler(addressController.isDefaultAddress))
router.post('/findOneAddressByCustomerIdAndIsDefault', asynchandler(addressController.getAddressByCustomerIdAndIsDefault))

module.exports = router

