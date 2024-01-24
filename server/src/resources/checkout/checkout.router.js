const express = require("express");
const { checkout } = require("./checkout.controller");
const checkoutRouter = express.Router()


checkoutRouter.post("/create-checkout-session", checkout)
// checkoutRouter.post("/verify-session", verify)

module.exports = checkoutRouter;