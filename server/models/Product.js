const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    id:String,
    productname:String,
    cost:Number,
    category:String,
    description:String,
    stock:Number,
})
const ProductModel=mongoose.model("products",ProductSchema)
module.exports=ProductModel