"use strict";

const { DataTypes, Model, UUIDV4 } = require("sequelize");
const sequelize = require("../../db/connection");
const User = require("../user/model");

class PaymentMethod extends Model {}

PaymentMethod.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    createdAtToken: {
      type: DataTypes.DATE,
    },
    idToken: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastFour: {
      type: DataTypes.STRING,
    },
    bin: {
      type: DataTypes.STRING,
    },
    expYear: {
      type: DataTypes.STRING,
    },
    expMonth: {
      type: DataTypes.STRING,
    },
    cardHolder: {
      type: DataTypes.STRING,
    },
    expiresAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "PaymentMethod",
  }
);



module.exports = PaymentMethod;
