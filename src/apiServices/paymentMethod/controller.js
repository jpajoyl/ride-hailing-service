const paymentMethodService = require("./service");

const createPaymentMethod = async (req, res) => {
  const paymentMethod = await paymentMethodService.createPaymentMethod(
    req.body
  );
  res.status(201).json({
    status: "created",
    data: paymentMethod,
  });
};
module.exports = {
  createPaymentMethod,
};
