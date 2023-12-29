const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        inStock: { type: Number, required: true, default: 0 },
        images: { type: String, required: true },
    },{versionKey: false});

const ProductModel = models.product || model("product", ProductSchema);
console.log("ProductModel created:", ProductModel);


const productJoiSchema = Joi.object({
    title: Joi.string().strict().required(),
    price: Joi.number().strict().required(),
    category: Joi.string().required(),
    description: Joi.string().strict().required(),
    inStock: Joi.number().strict().required(),
    images: Joi.string().uri().required(),
});

module.exports = { ProductModel, ProductSchema, productJoiSchema }