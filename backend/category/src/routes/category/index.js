"use strict";

const express = require("express");
const router = express.Router();
const { asynchandler } = require("../../helpers/asyncHandlers");
const { categoryController } = require("../../controllers");
const { authentication } = require("../../auth/authUtils");

router.post("/create", asynchandler(categoryController.createCategory));
router.post(
  "/getListCategoryByParentId",
  asynchandler(categoryController.getListCategoryByParentId)
);
router.post("/getAllCategory", asynchandler(categoryController.getAllCategory));
router.post(
  "/isTrashcategory",
  asynchandler(categoryController.isTrashcategory)
);
router.post(
  "/changeIsPublished",
  asynchandler(categoryController.changeIsPublished)
);
router.post(
  "/findCategoryById",
  asynchandler(categoryController.findCategoryById)
);
router.post(
  "/updateOneCategory",
  asynchandler(categoryController.updateOneCategory)
);

module.exports = router;
