const Product=require("../models/Product");


// GET PRODUCTS

exports.getProducts=async(req,res)=>{


try{


const products=
await Product.find();


res.json(products);


}
catch(error){

res.status(500).json(error);

}

};




// ADD PRODUCT

exports.addProduct=async(req,res)=>{


try{


const product=
await Product.create(req.body);



res.json({

message:"Product Added",

product

});


}
catch(error){

res.status(500).json(error);

}

};




// DELETE PRODUCT


exports.deleteProduct=async(req,res)=>{


await Product.findByIdAndDelete(
req.params.id
);


res.json({

message:"Deleted"

});


};