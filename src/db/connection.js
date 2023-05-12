const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } =
  process.env;

const db = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: "mysql",
});

module.exports = db;
