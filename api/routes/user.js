const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyAuthorization,
  verifyAdmin,
} = require("../middlewares");
const { catchAsync } = require("../utilities");
const user = require("../controllers/user");

// GET USERS
router.get("/", verifyToken, verifyAdmin, catchAsync(user.getUsers));

// GET USER
router.get("/:id", verifyToken, verifyAuthorization, catchAsync(user.getUser));

// UPDATE USER
router.put(
  "/:id",
  verifyToken,
  verifyAuthorization,
  catchAsync(user.updateUser)
);

// DELETE USER
router.delete(
  "/:id",
  verifyToken,
  verifyAuthorization,
  catchAsync(user.deleteUser)
);

module.exports = router;
