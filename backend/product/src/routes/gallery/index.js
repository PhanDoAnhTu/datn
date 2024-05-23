"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { galleryController } = require("../../controllers");
const { authentication } = require("../../auth/authUtils");

router.post("/addImage", asynchandler(galleryController.addImage));
router.post("/ListImageByProductId", asynchandler(galleryController.ListImageByProductId));

module.exports = router;
