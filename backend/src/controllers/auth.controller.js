const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const { User } = require("../models");
const { jwtSecret, jwtExpiresIn, cookieOptions } = require("../config/auth");
const { successResponse, errorResponse } = require("../utils/response");

/**
 * Generate JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
};

/**
 * Validation rules for user registration
 */
const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
];

/**
 * Validation rules for user login
 */
const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

/**
 * User registration controller
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return errorResponse(res, "User already exists with this email", 400);
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role: "customer",
      authProvider: "local",
    });

    // Generate token
    const token = generateToken(user);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    return successResponse(
      res,
      "Registration successful",
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          authProvider: user.authProvider,
        },
        token,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * User login controller
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user || user.authProvider !== "local") {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    // Generate token
    const token = generateToken(user);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    return successResponse(res, "Login successful", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        authProvider: user.authProvider,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Google OAuth callback handler
 */
const googleCallback = async (req, res, next) => {
  try {
    const user = req.user;

    // Generate token
    const token = generateToken(user);

    // Set cookie
    res.cookie("token", token, cookieOptions);

    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}?token=${token}&auth=success`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Google OAuth error:", error);
    res.redirect(`${process.env.FRONTEND_URL}?auth=error`);
  }
};

/**
 * Logout controller
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
 * Get current user
 */
const getCurrentUser = async (req, res, next) => {
  try {
    return successResponse(res, "User retrieved successfully", {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        authProvider: req.user.authProvider,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  googleCallback,
  logout,
  getCurrentUser,
  registerValidation,
  loginValidation,
};
