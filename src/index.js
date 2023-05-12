"use strict";
require("dotenv").config();
const User = require("./apiServices/user/model");
const PaymentMethod = require("./apiServices/paymentMethod/model");
const { app } = require("./app");
const sequelize = require("./db/connection");
const { errorHandler } = require("./middlewares");
const PaymentSource = require("./apiServices/paymentSource/model");
const Rider = require("./apiServices/rider/model");
const Ride = require("./apiServices/ride/model");
const Driver = require("./apiServices/driver/model");
const { PORT = 3000 } = process.env;

async function dbConnection() {
  try {
    await sequelize.authenticate();
    // ------
    PaymentMethod.belongsTo(User);
    User.hasMany(PaymentMethod);
    // ------
    // ------
    PaymentMethod.hasOne(PaymentSource);
    PaymentSource.belongsTo(PaymentMethod);
    // ------
    // ------
    Rider.hasMany(Ride);
    Ride.belongsTo(Rider, { foreignKey: "riderId" });
    Driver.hasMany(Ride);
    Ride.belongsTo(Driver, { foreignKey: "driverId" });
    // ------
    await sequelize.sync();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error(error);
  }
}

async function main() {
  try {
    await dbConnection();

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server start in port ${PORT}`);
    });
  } catch (error) {
    console.error("There is an error starting app");
    console.error(error);
    await sequelize.close();
    process.exit(0);
  }
}
main();
