const Rider = require("./model");

const createRider = async (riderData) => {
  const rider = new Rider(riderData);
  await rider.save();
  return rider;
};
module.exports = {
  createRider,
};
