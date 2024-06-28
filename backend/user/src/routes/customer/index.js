"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { customerController } = require("../../controllers");
const { authentication } = require("../../auth/authUtils");

router.get("/welcome", asynchandler(customerController.checkLoginEmailToken));
router.post("/signup", asynchandler(customerController.signUp));
router.post("/login", asynchandler(customerController.login));
router.get(
  "/getNameAndAvatarCustomer",
  asynchandler(customerController.getNameAndAvatarCustomer)
);
router.post(
  "/findCustomerById",
  asynchandler(customerController.findCustomerById)
);
router.post(
  "/updateCustomerStatus",
  asynchandler(customerController.updateCustomerStatus)
);

///authentication
router.use(authentication);

router.post("/logout", asynchandler(customerController.logout));
router.post(
  "/handlerRefreshToken",
  asynchandler(customerController.handlerRefreshToken)
);
router.post("/changeAvatar", asynchandler(customerController.changeAvatar));
router.post(
  "/updateInfomation",
  asynchandler(customerController.updateInfomation)
);
router.post("/resetPassword", asynchandler(customerController.resetPassword));
router.post("/verifyOtp", asynchandler(customerController.verifyOtp));
router.post("/changePassword", asynchandler(customerController.changePassword));
router.post("/checkPassword", asynchandler(customerController.checkPassword));

module.exports = router;
