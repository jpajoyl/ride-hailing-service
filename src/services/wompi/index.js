const { default: axios } = require("axios");

require("dotenv").config();
const { WOMPI_API_URL, WOMPI_PRIVATE_KEY, WOMPI_PUBLIC_KEY, ENV } = process.env;

class Wompi {
  static async cardTokenization(number, cvc, exp_month, exp_year, card_holder) {
    if (ENV === "dev") {
      return {
        data: {
          status: "CREATED",
          data: {
            id: "tok_prod_15_44c5638281if67l04eA63f705bfA5bde",
            created_at: "2020-09-07T19:09:31.585+00:00",
            brand: "VISA",
            name: "VISA-4242",
            last_four: "4242",
            bin: "538696",
            exp_year: "29",
            exp_month: "06",
            card_holder: "Pedro Pérez",
            expires_at: "2021-09-05T19:09:30.000Z",
          },
        },
        status_code: 201,
      };
    }
    try {
      const tokenizedCard = await axios.post(
        `${WOMPI_API_URL}/tokens/cards`,
        {
          number,
          cvc,
          exp_month,
          exp_year,
          card_holder,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${WOMPI_PUBLIC_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return {
        data: tokenizedCard.data,
        status_code: tokenizedCard.status,
      };
    } catch (error) {
      return {
        data: error,
        status_code: error.status,
      };
    }
  }

  static async paymentSource(type, token, customer_email, acceptance_token) {
    if (ENV === "dev") {
      return {
        data: {
          data: {
            id: 3891,
            public_data: {
              type: "CARD",
            },
            type: "CARD",
            status: "AVAILABLE",
          },
        },
        status_code: 201,
      };
    }
    try {
      const paymentSource = await axios.post(
        `${WOMPI_API_URL}/payment_sources`,
        {
          type,
          token,
          customer_email,
          acceptance_token,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${WOMPI_PRIVATE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return {
        data: paymentSource.data,
        status_code: paymentSource.status,
      };
    } catch (error) {
      return {
        data: error,
        status_code: error.status,
      };
    }
  }

  static async createTransaction(
    amount_in_cents,
    currency,
    customer_email,
    payment_method,
    reference,
    payment_source_id
  ) {
    if (ENV === "dev") {
      return {
        data: {
          data: {
            id: "1292-1602113476-10985",
            created_at: "2018-07-01 23:49:45 UTC",
            amount_in_cents: 3000000,
            status: "PENDING",
            reference: "TUPtdnVugyU40XlkhixhhGE6uYV2gh89",
            customer_email: "juan@example.com",
            currency: "COP",
            payment_method_type: "NEQUI",
            payment_method: {
              type: "NEQUI",
              phone_number: 573109990001,
            },
            shipping_address: {
              address_line_1: "Calle 45 23 - 10",
              country: "CO",
              region: "Cundinamarca",
              city: "Bogotá",
              phone_number: 573307654321,
            },
            redirect_url: "http://mitienda.com.co/pago/redirect",
            payment_link_id: null,
          },
        },
        status_code: 201,
      };
    }

    try {
      const transaction = await axios.post(
        `${WOMPI_API_URL}/transactions`,
        {
          amount_in_cents,
          currency,
          customer_email,
          payment_method,
          reference,
          payment_source_id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${WOMPI_PRIVATE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return {
        data: transaction.data,
        status_code: transaction.status,
      };
    } catch (error) {
      return {
        data: error,
        status_code: error.status,
      };
    }
  }
  static async geAcceptanceToken() {
    if (ENV === "dev") {
      return {
        data: {
          data: {
            presigned_acceptance: {
              acceptance_token:
                "eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6MSwicGVybWFsaW5rIjoiaHR0cHM6Ly93b21waS5jby93cC1jb250ZW50L3VwbG9hZHMvMjAxOS8wOS9URVJNSU5PUy1ZLUNPTkRJQ0lPTkVTLURFLVVTTy1VU1VBUklPUy1XT01QSS5wZGYiLCJmaWxlX2hhc2giOiIzZGNkMGM5OGU3NGFhYjk3OTdjZmY3ODExNzMxZjc3YiIsImppdCI6IjE1ODEwOTIzNjItMzk1NDkiLCJleHAiOjE1ODEwOTU5NjJ9.JwGfnfXsP9fbyOiQXFtQ_7T4r-tjvQrkFx0NyfIED5s",
              permalink:
                "https://wompi.co/wp-content/uploads/2019/09/TERMINOS-Y-CONDICIONES-DE-USO-USUARIOS-WOMPI.pdf",
              type: "END_USER_POLICY",
            },
          },
        },
        status_code: 200,
      };
    }
    try {
      const acceptanceToken = await axios.get(
        `${WOMPI_API_URL}/merchants/${WOMPI_PUBLIC_KEY}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${WOMPI_PUBLIC_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return {
        data: acceptanceToken.data,
        status_code: acceptanceToken.status,
      };
    } catch (error) {
      return {
        data: error,
        status_code: error.status,
      };
    }
  }
}

module.exports = Wompi;
