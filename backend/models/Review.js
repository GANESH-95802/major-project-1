const mongoose=require("mongoose");


const reviewSchema=new mongoose.Schema({


userId:String,

productId:String,

rating:Number,

comment:String


},
{
timestamps:true
});


module.exports=
mongoose.model(
"Review",
reviewSchema
);