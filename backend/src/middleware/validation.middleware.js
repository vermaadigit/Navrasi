const { validationResult } = require("express-validator");
const { errorResponse } = require("../utils/response");

/**
 * Middleware to validate request using express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));

    return errorResponse(res, "Validation failed", 400, formattedErrors);
  }

  next();
};

module.exports = validate;
