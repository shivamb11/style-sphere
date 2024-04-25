const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const {
  verifyToken,
  verifyAuthorization,
  verifyAdmin,
} = require("../middlewares");
const ExpressError = require("../ExpressError");
const { validateEmail, catchAsync } = require("../utilities");

// GET USERS
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  catchAsync(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// GET USER
router.get(
  "/:id",
  verifyToken,
  verifyAuthorization,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.send(others);
  })
);

// UPDATE USER
router.put(
  "/:id",
  verifyToken,
  verifyAuthorization,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    if (req.body.password) {
      const hashedPass = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashedPass;
    }

    if (!validateEmail(req.body.email)) {
      throw new ExpressError(400, "Email not valid");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    const { password, ...others } = updatedUser._doc;

    res.status(200).send(others);
  })
);

// DELETE USER
router.delete(
  "/:id",
  verifyToken,
  verifyAuthorization,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.status(200).send("User deleted successfully");
  })
);

module.exports = router;
