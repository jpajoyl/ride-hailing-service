const { createTransaction } = require("../../services/wompi");
const { getAvailableDriver } = require("../driver/service");
const PaymentMethod = require("../paymentMethod/model");
const PaymentSource = require("../paymentSource/model");
const User = require("../user/model");
const Ride = require("./model");

const createRide = async (rideData) => {
  rideData.startDate = new Date();
  const availableDriver = await getAvailableDriver();
  rideData.driverId = availableDriver.id;
  rideData.riderId = rideData.user.id;
  const ride = new Ride(rideData);
  await ride.save();
  return ride;
};

const finishRide = async (rideFinishData) => {
  try {
    const currentRide = await Ride.findByPk(rideFinishData.rideId);
    if (currentRide.status !== "finished") {
      throw new Error("Ride already finished");
    }
    currentRide.update({
      finishDate: new Date(),
      status: "finished",
      finishLatitude: rideFinishData.finishLatitude,
      finishLongitude: rideFinishData.finishLongitude,
    });
    await currentRide.save();
    const totalPay = currentRide.calculatePayment();
    const rider = await User.findByPk(currentRide.riderId, {
      include: PaymentMethod,
    });
    const paymentSource = await PaymentSource.findOne({
      where: { PaymentMethodId: rider.PaymentMethods[0].id },
    });
    const transactionResult = await createTransaction(
      totalPay,
      "COP",
      rider.email,
      {
        installments: rideFinishData.installments,
      },
      rideFinishData.reference,
      paymentSource.paymentSourceId
    );
    return {
      currentRide,
      totalPay,
      transactionResult: transactionResult.data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
module.exports = {
  createRide,
  finishRide,
};
