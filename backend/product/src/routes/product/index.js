"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { productController } = require("../../controllers");
// const { authentication } = require("../../auth/authUtils");

router.post("/spu/create", asynchandler(productController.newSpu));
router.get("/spu/getSpuById", asynchandler(productController.oneSpu));
router.post("/spu/getAllProductsByfilter", asynchandler(productController.getAllProductsByfilter));
router.post("/spu/allproducts", asynchandler(productController.AllProducts));
router.post("/spu/publishproduct", asynchandler(productController.PublishProduct));
router.post("/spu/newSpuAtribute", asynchandler(productController.newSpuAttribute));
router.post("/spu/findAttributeBySpuId", asynchandler(productController.findAttributeBySpuId));
router.post("/spu/findAllProductsByCategory", asynchandler(productController.findAllProductsByCategory));
router.post("/spu/findProductDetail", asynchandler(productController.findProductDetail));



module.exports = router;
