'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { topicController } = require('../../controllers');
const { authentication } = require('../../auth/authUtils');

router.post('/create', asynchandler(topicController.createTopic))
router.post('/getListTopic', asynchandler(topicController.getListTopic))
router.post('/getListTopicByParentId', asynchandler(topicController.getListTopicByParentId))




module.exports = router