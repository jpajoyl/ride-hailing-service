"use strict";

const { Router } = require("express");

const router = Router();

const rideController = require("./controller");
const isRider = require("../../middlewares/isRider");
const isDriver = require("../../middlewares/isDriver");

router.post("/", isRider, rideController.createRide);
router.post("/finish-ride", isDriver, rideController.finishRide);

module.exports = router;
