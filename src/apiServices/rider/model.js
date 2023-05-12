const User = require("../user/model");

class Rider extends User {
  constructor(data) {
    super({
      ...data,
      role: "rider",
    });
  }
}

module.exports = Rider;
