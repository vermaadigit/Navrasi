require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "your-fallback-secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "12h", // Shorter expiry
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: null, // Session cookie - expires when browser closes
  },
};
