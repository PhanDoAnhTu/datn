'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { uploadController } = require('../../controllers');
const { uploadDisk } = require('../../config/multiple.config');
const { authentication } = require('../../auth/authUtils');


// router.use(authentication)
router.post('/product/multiple', uploadDisk.array('files', 6), asynchandler(uploadController.uploadImageFormLocalFiles))


module.exports = router