const User=require("../models/User");

const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");


// REGISTER

exports.register=async(req,res)=>{


try{


const {name,email,password}=req.body;


const exist=await User.findOne({email});


if(exist){

return res.status(400).json({
message:"User already exists"
});

}



const hashPassword=
await bcrypt.hash(password,10);



const user=await User.create({

name,

email,

password:hashPassword


});



res.json({

message:"Registration success",

user

});



}
catch(error){

res.status(500).json(error);

}


};



// LOGIN


exports.login=async(req,res)=>{


try{


const {email,password}=req.body;


const user=
await User.findOne({email});



if(!user){

return res.status(404).json({
message:"User not found"
});

}



const match=
await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({
message:"Wrong password"
});

}




const token=
jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);



res.json({

token,

user

});




}
catch(error){

res.status(500).json(error);

}


};