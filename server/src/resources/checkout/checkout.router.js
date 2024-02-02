const express = require("express");
const { checkout } = require("./checkout.controller");
const checkoutRouter = express.Router()


checkoutRouter.post("/create-checkout-session", checkout)


module.exports = checkoutRouter;