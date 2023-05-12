"use strict";

const { DataTypes, Model, UUIDV4 } = require("sequelize");
const sequelize = require("../../db/connection");

class Ride extends Model {
  static fee = 3500;
  static feeForKm = 1000;
  static feeForMinut = 200;

  static calculateDistance(latitude1, longitude1, latitude2, longitude2) {
    const theta = longitude1 - longitude2;
    const distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(latitude1 * (Math.PI / 180)) *
          Math.sin(latitude2 * (Math.PI / 180)) +
          Math.cos(latitude1 * (Math.PI / 180)) *
            Math.cos(latitude2 * (Math.PI / 180)) *
            Math.cos(theta * (Math.PI / 180))
      );
    return Math.round(distance * 1.609344, 2);
  }
  static calculateMinutes(startDate, finishDate) {
    const miliseconsDiference = Math.abs(finishDate - startDate);
    return Math.floor(miliseconsDiference / 60000);
  }

  calculatePayment() {
    const latitude1 = this.initLatitude;
    const longitude1 = this.initLongitude;
    const latitude2 = this.finishLatitude;
    const longitude2 = this.finishLongitude;
    const kmDistance = Ride.calculateDistance(
      latitude1,
      longitude1,
      latitude2,
      longitude2
    );
    const minutesPast = Ride.calculateMinutes(this.startDate, this.finishDate);
    return (
      kmDistance * Ride.feeForKm + minutesPast * Ride.feeForMinut + Ride.fee
    );
  }
}

Ride.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "initiated",
    },
    startDate: {
      type: DataTypes.DATE,
    },
    finishDate: {
      type: DataTypes.DATE,
    },
    initLatitude: {
      type: DataTypes.BIGINT,
    },
    initLongitude: {
      type: DataTypes.BIGINT,
    },
    finishLatitude: {
      type: DataTypes.BIGINT,
    },
    finishLongitude: {
      type: DataTypes.BIGINT,
    },
  },
  {
    sequelize,
    modelName: "ride",
  }
);

module.exports = Ride;
