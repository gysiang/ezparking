const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DEV_DIALECT,
  },
  test: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_TEST_DIALECT,
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PRODUCTION_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_PRODUCTION_DIALECT,
  },
};
