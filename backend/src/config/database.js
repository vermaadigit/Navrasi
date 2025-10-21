const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create Sequelize instance with connection pooling for production
const sequelize = new Sequelize(
  process.env.DATABASE_URL || {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
  {
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      // Enable SSL for production (Heroku, AWS RDS, etc.)
      ...(process.env.NODE_ENV === "production" && {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }),
    },
  }
);

module.exports = sequelize;
