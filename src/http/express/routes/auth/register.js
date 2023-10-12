const express = require("express");

const { frontPath } = require("../../../../path");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.sendFile(frontPath + "register.html");
});

router.post("/", async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  try {
    await registerUser({ username, email, password, confirmPassword });
    return res.redirect("/auth/login?success");
  } catch (err) {
    next();
  }
});

module.exports = router;
