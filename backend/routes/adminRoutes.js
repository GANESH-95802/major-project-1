const express=require("express");

const router=express.Router();
const protect = require("../middleware/authMiddleware");

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admin role required." });
    }
};


const {

dashboard,
getUsers,
deleteUser,
updateOrderStatus

}=require("../controllers/adminController");



router.get(
"/dashboard",
protect,
adminOnly,
dashboard
);


router.get(
"/users",
protect,
adminOnly,
getUsers
);


router.delete(
"/user/:id",
protect,
adminOnly,
deleteUser
);



router.put(
"/order/:id",
protect,
adminOnly,
updateOrderStatus
);



module.exports=router;