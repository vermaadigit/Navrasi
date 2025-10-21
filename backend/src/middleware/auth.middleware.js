const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const { User } = require("../models");
const { errorResponse } = require("../utils/response");

/**
 * Middleware to verify JWT token and authenticate user
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    let token = req.cookies.token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return errorResponse(res, "Authentication required", 401);
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Find user
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return errorResponse(res, "User not found", 401);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return errorResponse(res, "Invalid token", 401);
    }
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Token expired", 401);
    }
    return errorResponse(res, "Authentication failed", 401);
  }
};

/**
 * Middleware to check if user has admin role
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return errorResponse(res, "Authentication required", 401);
  }

  if (req.user.role !== "admin") {
    return errorResponse(res, "Admin access required", 403);
  }

  next();
};

module.exports = {
  authenticate,
  isAdmin,
};
