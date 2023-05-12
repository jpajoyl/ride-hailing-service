"use strict";

const { Router } = require("express");

const router = Router();

const riderController = require("./controller");

router.post("/", riderController.createRider);

module.exports = router;
