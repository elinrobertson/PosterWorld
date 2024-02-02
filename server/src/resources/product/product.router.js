const express = require("express");
const { getProducts, getProductsByCategory, getProductsById, getProductByTitle } = require("./product.controller");
const productRouter = express.Router();

productRouter.get("", async (req, res) => {
    try {
        const products = await getProducts(req, res);
        res.status(200).json(products);
        return; 
    } catch (error) {
        console.log("Error in router:", error);
        res.status(400).json(error);
        return;
    }
});

productRouter.get("/byCategory/:categoryName", getProductsByCategory);
productRouter.get("/:id", getProductsById);
productRouter.get("/:category/:title", getProductByTitle);

module.exports = productRouter;
