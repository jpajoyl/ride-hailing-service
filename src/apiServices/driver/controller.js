const driverService = require("./service");

const createDriver = async (req, res) => {
  const driver = await driverService.createDriver(req.body);
  res.status(201).json({
    status: "created",
    data: driver,
  });
};
module.exports = {
    createDriver,
};
