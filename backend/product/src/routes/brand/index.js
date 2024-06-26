"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { brandController } = require("../../controllers");

router.post("/create", asynchandler(brandController.createBrand));
router.post("/findListBrand", asynchandler(brandController.getListBrand));
router.post("/updateOneBrand", asynchandler(brandController.updateOneBrand));
router.post("/findBrandById", asynchandler(brandController.findBrandById));
router.post("/changeIsPublished", asynchandler(brandController.changeIsPublished));
router.post("/isTrash", asynchandler(brandController.isTrash));

module.exports = router;
