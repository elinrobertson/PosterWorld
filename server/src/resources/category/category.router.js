const express = require("express");
const { getCategories, getCategoryById, getProductsByCategory } = require("./category.controller");
const categoryRouter = express.Router();

categoryRouter.get("", async (req, res) => {
    try {
        const categories = await getCategories(req, res);
        // console.log("Categories in router:", categories);
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error in router:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

categoryRouter.get("/:id", getCategoryById);
categoryRouter.get('/:categoryId/products', getProductsByCategory);

module.exports = categoryRouter;
