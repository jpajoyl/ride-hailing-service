"use strict";

const { Router } = require("express");

const router = Router();

const paymentMethodController = require("./controller");
const isRider = require("../../middlewares/isRider");

router.post("/", isRider, paymentMethodController.createPaymentMethod);

module.exports = router;
