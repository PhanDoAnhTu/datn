'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { uploadController } = require('../../controllers');
const { uploadDisk } = require('../../config/multiple.config');
// const { authentication } = require('../../auth/authUtils');


// router.use(authentication)
router.post('/product/uploadSkuImageList', uploadDisk.array('files', 6), asynchandler(uploadController.uploadSkuImageList))
router.post('/product/uploadSingleImage', uploadDisk.single('file'), asynchandler(uploadController.uploadSingleImage))
router.post('/product/uploadImageArray', uploadDisk.array('files', 6), asynchandler(uploadController.uploadImageArray))


module.exports = router