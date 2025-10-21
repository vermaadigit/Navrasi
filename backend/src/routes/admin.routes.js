const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

/**
 * @route   POST /api/admin/login
 * @desc    Admin login
 * @access  Public
 */
router.post(
  "/login",
  adminController.loginValidation,
  validate,
  adminController.login
);

/**
 * @route   POST /api/admin/logout
 * @desc    Admin logout
 * @access  Private (Admin)
 */
router.post("/logout", authenticate, isAdmin, adminController.logout);

/**
 * @route   GET /api/admin/me
 * @desc    Get current admin user
 * @access  Private (Admin)
 */
router.get("/me", authenticate, isAdmin, adminController.getCurrentUser);

module.exports = router;
