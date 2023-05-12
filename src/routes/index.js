"use strict";

const root = require("./root");
const user = require("../apiServices/user/routes");
const rider = require("../apiServices/rider/routes");
const driver = require("../apiServices/driver/routes");
const paymentMethod = require("../apiServices/paymentMethod/routes");
const ride = require("../apiServices/ride/routes");

module.exports = {
  root,
  user,
  rider,
  driver,
  paymentMethod,
  ride,
};
