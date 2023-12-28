const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const ProductSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    inStock: {type: Number, required: true, default: 0},
    image: {type: String, required: true},
    description: {type: String, required: true},
},{versionKey: false});

const ProductModel = models.product || model("product", ProductSchema);

const productJoiSchema = Joi.object({
    title: Joi.string().strict().required(),
    price: Joi.number().strict().required(),
    category: Joi.string().required(),
    // category: Joi.objectId().required(), osäker på vilken som ska vara här
    inStock: Joi.number().strict().required(),
    image: Joi.string().uri().required(),
    description: Joi.string().strict().required(),
});

module.exports = { ProductModel, ProductSchema, productJoiSchema }