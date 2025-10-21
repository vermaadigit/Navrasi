const { errorResponse } = require("../utils/response");

/**
 * Global error handling middleware
 */
const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err);

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return errorResponse(res, "Validation error", 400, errors);
  }

  // Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    return errorResponse(res, "Duplicate entry", 409);
  }

  // Sequelize database errors
  if (err.name === "SequelizeDatabaseError") {
    return errorResponse(res, "Database error", 500);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return errorResponse(res, "Invalid token", 401);
  }

  // Multer file upload errors
  if (err.name === "MulterError") {
    return errorResponse(res, `File upload error: ${err.message}`, 400);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return errorResponse(res, message, statusCode);
};

module.exports = errorMiddleware;
