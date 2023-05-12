const driverService = require("./service");

const createDriver = async (req, res) => {
  /* {
    "name": "driver",
    "emai": "test@test.com"
} */
  const driver = await driverService.createDriver(req.body);
  res.status(201).json({
    status: "created",
    data: driver,
  });
};
module.exports = {
  createDriver,
};
