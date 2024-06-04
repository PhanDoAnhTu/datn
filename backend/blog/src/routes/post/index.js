'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { postController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/create', asynchandler(postController.createPost))
router.post('/getListPosts', asynchandler(postController.getListPosts))
router.post('/getListPostsByTopicId', asynchandler(postController.getListPostsByTopicId))


module.exports = router