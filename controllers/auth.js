const e = require('express')
const User=require('../models/user')
const errorResponse=require("../utils/errorResponse")
exports.login=async function(req,res,next){

    try{
        const{email,password}=req.body
        if(!email || !password){
            return next(new errorResponse(`Email and Password are required`,400))
        }

        const user=await User.findOne({
            email:email
        }).select("+password")

        if(!user){
            return next(new errorResponse(`Credentials are invalid`,401))   
        }
        const isMatch= await user.authPassword(password);  
        if(!isMatch){
            return next(new errorResponse(`Credentials are invalid`,401))
        }   
        sendResponse(user,200,res)
    }catch(error){
        next(error);
    }
    
}

exports.register=async function(req, res,next){
    try{
        const {name,email,password}=req.body;
        const newUser=await User.create({
            name,email,password
        })
        sendResponse(newUser,200,res)
    }catch(error){
        next(error);
    }
   
}

exports.logout=function(req, res,next){
    console.log("Inside logout function")
    return res.json({
        msg:"Inside logout function"
    })
}

//@desc Get Logged in User
//@Route GET /api/v1/auth/login
//@access Public

exports.getCurrentUser=async(req,res,next)=>{
    try{
        if(!req.user){
            return next(new errorResponse("No user is logged in"))
        }

        res.status(200).json({
           success:true,
           data:req.user
       })
    }catch(error){
        next(error);
    }
}


const sendResponse =(user,statusCode,res)=>{
    const token=user.getJWTSignature();

    const options={
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE *24*60*60*1000),
        httpOnly:true,
    }
    if(process.env.NODE_ENV==='production'){
        options.secure=true
    }
    res
        .status(statusCode)
        .cookie('token',token,options)
        .json({
            success:true,
            token
        })
}
