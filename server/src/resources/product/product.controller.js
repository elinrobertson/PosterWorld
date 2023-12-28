const { ProductModel } = require("./product.model");

console.log(error.message);

const getProducts = async (req, res)  => {
    console.log("Controller is hit!");
    console.log(error.message);
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.log("Error in controller:", error);
        res.status(400).json(error);
    }
};

module.exports = { getProducts }