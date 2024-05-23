'use strict';

const express = require('express')
const router = express.Router()
const { asynchandler } = require('../../helpers/asyncHandlers')
const { rbacController } = require('../../controllers');


router.post('/role/create', asynchandler(rbacController.newRole))
router.post('/role/list', asynchandler(rbacController.roleList))

router.post('/resource/create', asynchandler(rbacController.newResource))
router.post('/resource/list', asynchandler(rbacController.resourceList))

module.exports = router