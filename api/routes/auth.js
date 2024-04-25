const express = require("express");
const router = express.Router();

const { catchAsync } = require("../utilities");
const { validateUser } = require("../middlewares");
const auth = require("../controllers/auth");

// REGISTER
router.post("/register", validateUser, catchAsync(auth.register));

// LOGIN
router.post("/login", catchAsync(auth.login));

module.exports = router;
