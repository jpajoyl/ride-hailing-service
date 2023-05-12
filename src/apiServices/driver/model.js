const User = require("../user/model");

class Driver extends User {
  constructor(data) {
    super({
      ...data,
      role: "driver",
    });
  }
}

module.exports = Driver;
