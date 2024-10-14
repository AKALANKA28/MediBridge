// routes/adminRoutes.js
const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { getAllUsers, createUser } = require("../controllers/adminController");

const router = express.Router();

// Admin routes
router.route("/users").get(protect, authorize("admin"), getAllUsers);
router.route("/users/new").post(protect, authorize("admin"), createUser);

module.exports = router;
