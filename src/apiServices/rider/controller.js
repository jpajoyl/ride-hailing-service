const riderService = require("./service");

const createRider = async (req, res) => {
  const rider = await riderService.createRider(req.body);
  res.status(201).json({
    status: "created",
    data: rider,
  });
};
module.exports = {
  createRider,
};
