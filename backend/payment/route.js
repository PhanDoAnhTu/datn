const express = require("express");
const router = express.Router();

router.get("/a", async (req, res, next) => {
  console.log(req);
});

module.exports = router;
