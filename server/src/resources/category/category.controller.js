const { CategoryModel } = require("./category.model");


// Hämtar alla kategorier
const getCategories = async () => {
    try {
        const categories = await CategoryModel.find();
        console.log("Categories from controller:", categories);
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

module.exports = { getCategories, getCategoryById };


