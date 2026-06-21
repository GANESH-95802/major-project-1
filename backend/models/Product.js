const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({

title:String,

name:String,

description:String,

price:Number,

category:String,

imageUrl:String,

image:String,

stock:Number,

rating:Number


},
{
timestamps:true
});


module.exports=
mongoose.model(
"Product",
productSchema,
"item"
);