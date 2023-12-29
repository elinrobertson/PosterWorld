const { ProductModel } = require("./product.model");

const getProducts = async (req, res)  => {
    console.log("Controller is hit!");
    try {
        const products = await ProductModel.find();
        console.log("Products from database:", products); // Lägg till denna rad
        res.status(200).json(products);
    } catch (error) {
        console.log("Error in controller:", error.message);
        res.status(400).json(error);
    }
};

module.exports = { getProducts };
