"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { reviewController } = require("../../controllers");
// const { authentication } = require("../../auth/authUtils");

router.post("/createReview", asynchandler(reviewController.createReview));
router.post("/findReviewByProductId", asynchandler(reviewController.findReviewByProductId));
router.post("/findReviewById", asynchandler(reviewController.findReviewById));
router.post("/listReview", asynchandler(reviewController.listReview));

module.exports = router;
