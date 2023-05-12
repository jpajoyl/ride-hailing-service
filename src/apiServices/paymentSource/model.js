"use strict";

const { DataTypes, Model, UUIDV4 } = require("sequelize");
const sequelize = require("../../db/connection");

class PaymentSource extends Model {}

PaymentSource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    paymentSourceId: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "PaymentSource",
  }
);

module.exports = PaymentSource;
