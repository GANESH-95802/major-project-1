const Order=require("../models/Order");



exports.createOrder=async(req,res)=>{


try{

// Force userId to match the authenticated user
const orderData = { ...req.body, userId: req.user._id };
const order=
await Order.create(orderData);



res.json({

message:"Order Created",

order

});


}
catch(error){

res.status(500).json(error);

}


};




exports.getOrders=async(req,res)=>{

try {
  let query = {};
  // If the user is not admin, only fetch their own orders
  if (req.user && req.user.role !== "admin") {
    query.userId = req.user._id;
  }
  
  const orders=
  await Order.find(query).sort({ createdAt: -1 });


  res.json(orders);
} catch (error) {
  res.status(500).json(error);
}


};