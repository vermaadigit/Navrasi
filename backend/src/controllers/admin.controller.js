const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { User } = require("../models");
const { jwtSecret, jwtExpiresIn, cookieOptions } = require("../config/auth");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * Validation rules for admin login
 */
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

/**
 * Admin login controller
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return errorResponse(
        res,
        "Access denied. Admin privileges required",
        403
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    // Set cookie
    res.cookie("token", token, cookieOptions);

    // Return user data and token
    return successResponse(res, "Login successful", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin logout controller
 */
const logout = async (req, res, next) => {
  try {
    // Clear cookie
    res.clearCookie("token", cookieOptions);

    return successResponse(res, "Logout successful");
  } catch (error) {
    next(error);
  }
};

/**
 * Get current admin user
 */
const getCurrentUser = async (req, res, next) => {
  try {
    return successResponse(res, "User retrieved successfully", {
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  getCurrentUser,
  loginValidation,
};
