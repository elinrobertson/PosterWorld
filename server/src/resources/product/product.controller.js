const { ProductModel } = require("./product.model");


//Hämtar alla produkter
const getProducts = async () => {
    try {
        const products = await ProductModel.find();
        return products; // Returnera produkterna istället för att skicka svar
    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw error; // Kasta felet för att hantera det i den överliggande koden
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
async function getProductsById(req, res, next) {
    try {
        // Här lägger du till en logg för att se vad som returneras från findById
        const product = await ProductModel.findById(req.params.id);
        console.log("Result from ProductModel.findById:", product);

        if (!product) {
            return res.status(404).json({ error: "Produkten kunde inte hittas." });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Fel vid hämtning av produkt från databasen:', error.message);
        return res.status(500).json({ error: "Ett fel uppstod vid hämtning av produkten från databasen." });
    }
}



const getProductByTitle = async (req, res, next) => {
    const title = req.params.title;
    try {
        // console.log("Requested title:", title);

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
