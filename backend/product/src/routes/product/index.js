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

router.post("/spu/PublishProduct", asynchandler(productController.PublishProduct));
router.post("/spu/UnPublishProduct", asynchandler(productController.UnPublishProduct));
router.post("/spu/isTrashProduct", asynchandler(productController.isTrashProduct));

router.post("/spu/newSpuAttribute", asynchandler(productController.newSpuAttribute));
router.post("/spu/findAttributeBySpuId", asynchandler(productController.findAttributeBySpuId));
router.post("/spu/findProductsByCategory", asynchandler(productController.findProductsByCategory));
router.post("/spu/findProductDetail", asynchandler(productController.findProductDetail));
router.post("/spu/productFromCart", asynchandler(productController.productFromCart));
router.post("/spu/AllProductsOption", asynchandler(productController.AllProductsOption));
router.post("/spu/findProductBestSelling", asynchandler(productController.findProductBestSelling));
router.post("/spu/OneProductDetail", asynchandler(productController.OneProductDetail));

module.exports = router;
