'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { categoryController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

 router.post('/create', asynchandler(categoryController.createCategory))
 router.post('/getListCategoryByParentId', asynchandler(categoryController.getListCategoryByParentId))

module.exports = router