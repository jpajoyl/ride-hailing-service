"use strict";

const { Router } = require("express");

const router = Router();

const userController = require("./controller");

router.get("/", userController.getAllUsers);

module.exports = router;
