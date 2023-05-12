const Driver = require("./model");

const createDriver = async (driverData) => {
  const driver = new Driver(driverData);
  await driver.save();
  return driver;
};
const getAvailableDriver = async () => {
  const driver = await Driver.findOne({ where: { role: "driver" } });
  return driver;
};
module.exports = {
  createDriver,
  getAvailableDriver,
};
