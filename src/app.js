"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { ENV = "dev" } = process.env;

const app = express();

if (ENV !== "test") {
  app.use(morgan(ENV !== "dev" ? "common" : "dev"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Object.keys(routes).forEach((routeName) => {
  const routePath = routeName === "root" ? "" : `/${routeName}`;
  console.log(`/api/v1${routePath}`);
  app.use(`/api/v1${routePath}`, routes[routeName]);
});

module.exports = {
  app,
};
