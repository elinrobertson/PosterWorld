const { ProductModel } = require("./product.model");


const getProducts = async () => {
    try {
        const products = await ProductModel.find();
        return products; 
    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw error; 
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const products = await ProductModel.find({ category: req.params.categoryName });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getProductsById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Produkten kunde inte hittas." });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: "Ett fel uppstod vid hämtning av produkten från databasen." });
    }
}

const getProductByTitle = async (req, res) => {
    const title = req.params.title;
    try {

        const product = await ProductModel.findOne({ title: title });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { getProducts, getProductsByCategory, getProductsById, getProductByTitle };
