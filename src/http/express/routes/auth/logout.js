const express = require("express");

const router = express.Router();

router.post("/", (req, res, next) => {
  res.clearCookie("token");
  return res.redirect("/auth/login");
});

module.exports = router;
