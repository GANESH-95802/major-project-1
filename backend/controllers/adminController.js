const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");


// ADMIN DASHBOARD DATA

exports.dashboard = async(req,res)=>{

try{


const users = await User.countDocuments();

const products = await Product.countDocuments();

const orders = await Order.countDocuments();


const revenueData = await Order.aggregate([

{
$group:{
_id:null,
total:{$sum:"$total"}
}
}

]);



res.json({

users,

products,

orders,

revenue:
revenueData[0]?.total || 0


});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};




// GET ALL USERS

exports.getUsers = async(req,res)=>{


try{


const users =
await User.find().select("-password");


res.json(users);


}
catch(error){

res.status(500).json(error);

}


};




// DELETE USER


exports.deleteUser = async(req,res)=>{


try{


await User.findByIdAndDelete(
req.params.id
);



res.json({

message:"User deleted"

});


}
catch(error){

res.status(500).json(error);

}


};




// UPDATE ORDER STATUS


exports.updateOrderStatus = async(req,res)=>{


try{


const order =
await Order.findByIdAndUpdate(

req.params.id,

{
status:req.body.status
},

{
new:true
}

);



res.json(order);


}
catch(error){

res.status(500).json(error);

}


};