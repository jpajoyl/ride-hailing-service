const paymentMethodService = require("./service");

const createPaymentMethod = async (req, res) => {
  /* {
    "number": "4242424242424242",
    "cvc": "123",
    "exp_month": "06",
    "exp_year": "29",
    "card_holder": "Pedro Pérez",
    "userId": "69494d51-ebb0-4510-a056-a6fc61ff62b7",
    "userEmail": "hola@gmail.com"
} */
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
