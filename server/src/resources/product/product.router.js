const express = require("express");
const { getProducts } = require("./product.controller");
// const { productJoiSchema } = require("./product.model");
const productRouter = express.Router();

// Logga att routen träffas
productRouter.get("", async (req, res) => {
    console.log("Route is hit!");
    try {
        const products = await getProducts(req, res);
        res.status(200).json(products);
    } catch (error) {
        console.log("Error in router:", error);
        res.status(400).json(error);
    }
});

module.exports = productRouter;  // Exportera routern, inte ett objekt
