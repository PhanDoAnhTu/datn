'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { commentController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');


router.post('/getCommentByParentId', asynchandler(commentController.getCommentByParentId))

///authentication
// router.use(authentication)
router.post('/create', asynchandler(commentController.createComment))
router.post('/deleteCommentByIdAndProductId', asynchandler(commentController.deleteCommentByIdAndProductId))



module.exports = router