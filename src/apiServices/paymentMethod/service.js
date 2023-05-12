const {
  cardTokenization,
  paymentSource,
  geAcceptanceToken,
} = require("../../services/wompi");
const { createPaymentSource } = require("../paymentSource/service");
const PaymentMethod = require("./model");

const createPaymentMethod = async (paymentMethodData) => {
  const cardResult = await cardTokenization({
    number: paymentMethodData.number,
    cvc: paymentMethodData.cvc,
    exp_month: paymentMethodData.exp_month,
    exp_year: paymentMethodData.exp_year,
    card_holder: paymentMethodData.card_holder,
  });
  if (cardResult.status_code === 201) {
    const paymentInfoForCreate = {
      createdAtToken: cardResult.data.data.created_at,
      idToken: cardResult.data.data.id,
      brand: cardResult.data.data.brand,
      name: cardResult.data.data.name,
      lastFour: cardResult.data.data.last_four,
      bin: cardResult.data.data.bin,
      expYear: cardResult.data.data.exp_year,
      expMonth: cardResult.data.data.exp_month,
      cardHolder: cardResult.data.data.card_holder,
      expiresAt: cardResult.data.data.expires_at,
      UserId: paymentMethodData.userId,
    };

    const paymentMethod = new PaymentMethod(paymentInfoForCreate);

    await paymentMethod.save();

    const acceptanceToken = await geAcceptanceToken();

    const paymentSourceWompi = await paymentSource(
      "CARD",
      paymentMethod.idToken,
      paymentMethodData.userEmail,
      acceptanceToken.data.data.presigned_acceptance.acceptance_token
    );

    console.log("paymentSourceWompi", paymentSourceWompi);

    const paymentSourceResult = await createPaymentSource({
      paymentSourceId: paymentSourceWompi.data.data.id,
      type: paymentSourceWompi.data.data.type,
      status: paymentSourceWompi.data.data.status,
      PaymentMethodId: paymentMethod.id,
    });

    return paymentMethod;
  }
};
module.exports = {
  createPaymentMethod,
};
