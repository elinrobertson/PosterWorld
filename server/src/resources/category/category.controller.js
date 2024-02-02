const { ProductModel } = require("../product/product.model")
const { CategoryModel } = require("./category.model");


const getCategories = async () => {
    try {
        const categories = await CategoryModel.find();
        return categories;
    } catch (error) {
        console.log("Error in controller:", error);
        throw error;
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({_id:req.params.id});
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json(error);
    }
}

const getProductsByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const products = await ProductModel.find({ category: categoryId });
      res.json(products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


module.exports = { getCategories, getCategoryById, getProductsByCategory };


