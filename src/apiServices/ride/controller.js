const rideService = require("./service");

const createRide = async (req, res) => {
  const ride = await rideService.createRide(req.body);
  res.status(201).json({
    status: "created",
    data: ride,
  });
};
const finishRide = async (req, res) => {
  const rideInfo = await rideService.finishRide(req.body);
  res.status(200).json({
    status: "ok",
    data: rideInfo,
  });
};
module.exports = {
  createRide,
  finishRide
};
