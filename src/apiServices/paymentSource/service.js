const PaymentSource = require("./model");

const createPaymentSource = async (paymentSourceData) => {
  const payment = new PaymentSource(paymentSourceData);
  await payment.save();
  return payment;
};
module.exports = {
  createPaymentSource,
};
