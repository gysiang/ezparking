const dotenv = require("dotenv");

module.exports = {
  development: {
    username: process.env.DB_USER_NAME,
    password: null,
    database: "ezparking_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER_NAME,
    password: null,
    database: "ezparking_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: null,
    database: "ezparking_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
