const rideService = require("./service");

const createRide = async (req, res) => {
  // request ride
  /* {
    "initLatitude": 10,
    "initLongitude": 45,
    "userId": "69494d51-ebb0-4510-a056-a6fc61ff62b7" riderId
} */
  const ride = await rideService.createRide(req.body);
  res.status(201).json({
    status: "created",
    data: ride,
  });
};
const finishRide = async (req, res) => {
  /* {
    "userId": "a09606de-8cfb-4466-98a2-39884df4302e", riderId
    "rideId": "10e2cfa3-9447-46ba-9c01-36be31cfc514",
    "finishLatitude": 75634,
    "finishLongitude": 23456
} */
  const rideInfo = await rideService.finishRide(req.body);
  res.status(200).json({
    status: "ok",
    data: rideInfo,
  });
};
module.exports = {
  createRide,
  finishRide,
};
