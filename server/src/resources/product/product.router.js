const express = require("express");
const { getProducts, getProductsByCategory, getProductsById, getProductByTitle } = require("./product.controller")
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
productRouter.get("/:category/:title", getProductByTitle);



module.exports = productRouter;
