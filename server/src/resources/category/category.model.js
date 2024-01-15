const { Schema, model, models, Types } = require("mongoose");

const CategorySchema = new Schema({
    _id: { type: Types.ObjectId, auto: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
})

const CategoryModel = models.category || model("category", CategorySchema);

module.exports = { CategoryModel, CategorySchema };