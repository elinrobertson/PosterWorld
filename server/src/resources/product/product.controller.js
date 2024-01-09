const { ProductModel } = require("./product.model");
// const { Product } = require("./product.model");


//Hämtar alla produkter
const getProducts = async (req, res)  => {
    console.log("Controller is hit!");
    try {
        const products = await ProductModel.find();
        console.log("Products from database:", products);
        res.status(200).json(products);
    } catch (error) {
        console.log("Error in controller:", error.message);
        res.status(400).json(error);
    }
};

//Hämtar alla produkter i en specifik kategori
const getProductsByCategory = async (req, res, next) => {
    // console.log("Requested category:", req.params.categoryName);
    try {
        // console.log("Fetching products for category:", req.params.categoryName);
        const products = await ProductModel.find({ category: req.params.categoryName });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Hämtar produkter efter ID
const getProductsById = async (req, res, next) => {
    const products = await ProductModel.findOne({_id:req.params.id})
    if (products) {
        res.status(200).json(products); 
    } else {
        res.status(404).json(400);
    }
};


module.exports = { getProducts, getProductsByCategory, getProductsById };
