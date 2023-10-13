const express = require("express");

const logoutRoute = require("./logout");
const loginRoutes = require("./login");
const registerRoutes = require("./register");
const { validateNotLoggedIn } = require("../../middlewares");

const router = express.Router();

router.use("/logout", logoutRoute);

router.use(validateNotLoggedIn);

router.use("/login", loginRoutes);
router.use("/register", registerRoutes);

module.exports = router;