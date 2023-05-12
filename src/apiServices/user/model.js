"use strict";

const { DataTypes, Model, UUIDV4 } = require("sequelize");
const sequelize = require("../../db/connection");
const PaymentMethod = require("../paymentMethod/model");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
      },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
