require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "your-fallback-secret-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};
