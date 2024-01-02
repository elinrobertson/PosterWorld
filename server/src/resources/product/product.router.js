const express = require("express");
const { getProducts } = require("./product.controller");
// const { productJoiSchema } = require("./product.model");
const { getProductsByCategory, getProductsById } = require("./product.controller")
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

productRouter.get("/byCategory/:categoryName", getProductsByCategory);
productRouter.get("/:id", getProductsById);



module.exports = productRouter;
