const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

/**
 * @route POST /api/auth/register
 * @desc Register new user
 * @access Public
 */
router.post(
  "/register",
  authController.registerValidation,
  validate,
  authController.register
);

/**
 * @route POST /api/auth/login
 * @desc User login
 * @access Public
 */
router.post(
  "/login",
  authController.loginValidation,
  validate,
  authController.login
);

/**
 * @route GET /api/auth/google
 * @desc Start Google OAuth flow
 * @access Public
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @route GET /api/auth/google/callback
 * @desc Google OAuth callback
 * @access Public
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback
);

/**
 * @route POST /api/auth/logout
 * @desc User logout
 * @access Private
 */
router.post("/logout", authenticate, authController.logout);

/**
 * @route GET /api/auth/me
 * @desc Get current user
 * @access Private
 */
router.get("/me", authenticate, authController.getCurrentUser);

module.exports = router;
