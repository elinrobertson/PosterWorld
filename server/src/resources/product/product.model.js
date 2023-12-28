const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const ProductSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    description: {type: String, required: true},
    inStock: {type: Number, required: true, default: 0},
    images: {type: String, required: true},
},{versionKey: false});

const ProductModel = models.product || model("product", ProductSchema);

const productJoiSchema = Joi.object({
    title: Joi.string().strict().required(),
    price: Joi.number().strict().required(),
    category: Joi.string().required(),
    description: Joi.string().strict().required(),
    // category: Joi.objectId().required(), osäker på vilken som ska vara här
    inStock: Joi.number().strict().required(),
    images: Joi.string().uri().required(),
});

module.exports = { ProductModel, ProductSchema }