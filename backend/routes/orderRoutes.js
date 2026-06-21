const express=require("express");

const router=express.Router();
const protect = require("../middleware/authMiddleware");


const {

createOrder,
getOrders

}=require("../controllers/orderController");



router.post(
"/create",
protect,
createOrder
);



router.get(
"/",
protect,
getOrders
);



module.exports=router;