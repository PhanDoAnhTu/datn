'use strict';

const express = require('express')
const router = express.Router()

const { profileController } = require('../../controllers');
const { grantAccess } = require('../../middlewares/rbac');


router.get('/viewAny', grantAccess('readAny', 'profile'), profileController.profiles)
router.get('/viewOwn', grantAccess('readOwn', 'profile'), profileController.profile)


module.exports = router