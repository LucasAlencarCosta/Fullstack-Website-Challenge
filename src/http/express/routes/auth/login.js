const express = require("express");

const { loginUser } = require("../../../../user");
const { frontPath } = require("../../../../path");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.sendFile(frontPath + "login.html");
  next();
});

router.post("/", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const token = await loginUser(username, password);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (err) {
    next();
  }
});

module.exports = router;
