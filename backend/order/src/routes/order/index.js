"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { orderController } = require("../../controllers");
const { authentication } = require("../../auth/authUtils");

router.post("/checkoutReview", asynchandler(orderController.checkoutReview));
router.post("/createOrder", asynchandler(orderController.createOrder));
router.post(
  "/changeStatusOrderByOrderId",
  asynchandler(orderController.changeStatusOrderByOrderId)
);
router.post(
  "/findOrderByUserId",
  asynchandler(orderController.findOrderByUserId)
);


module.exports = router;
