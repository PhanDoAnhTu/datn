"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { productController } = require("../../controllers");
const { authentication } = require("../../auth/authUtils");

router.post("/spu/create", asynchandler(productController.newSpu));
router.get("/spu/getSpuById", asynchandler(productController.oneSpu));
router.post("/spu/allproducts", asynchandler(productController.AllProducts));
router.post("/spu/publishproduct", asynchandler(productController.PublishProduct));

module.exports = router;
