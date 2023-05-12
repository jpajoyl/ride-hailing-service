const riderService = require("./service");

const createRider = async (req, res) => {
  /* {
    "name": "driver",
    "emai": "test@test.com"
} */
  const rider = await riderService.createRider(req.body);
  res.status(201).json({
    status: "created",
    data: rider,
  });
};
module.exports = {
  createRider,
};
