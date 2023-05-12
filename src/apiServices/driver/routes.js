"use strict";

const { Router } = require("express");

const router = Router();

const driverController = require("./controller");

router.post("/", driverController.createDriver);

module.exports = router;
