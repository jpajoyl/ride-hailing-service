"use strict";

const { Router } = require("express");
const pk = require(`${process.cwd()}/package.json`);
const router = Router();

router.get("/", (_, res) =>
  res.json({
    service: "ride-hailing-service",
    status: "ok",
    version: pk.version,
  })
);

module.exports = router;
