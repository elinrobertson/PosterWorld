const express = require("express");
const { getProducts } = require("./product.controller");
const { productJoiSchema } = require("./product.model");
const productRouter = express.Router();

productRouter.get("", (req, res) => {
    console.log("Route is hit!");
    getProducts(req, res);
});



module.exports = { productRouter }