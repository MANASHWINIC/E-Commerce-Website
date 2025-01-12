const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: String,
    productname: String,
    cost: Number,
    category: String,
    description: String,
    stock: Number,
    imageUrl: { type: String, required: false }, 
    brand:String,// Add imageUrl field
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
