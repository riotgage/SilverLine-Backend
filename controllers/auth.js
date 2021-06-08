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


//@desc Update User Password
//@Route PUT /api/v1/auth/updatePassword
//@access Private

exports.updateUserPassword=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id).select('+password')
        console.log(req);

        if(!(await user.authPassword(req.body.currentPassword))){
            return next(new errorResponse("Password is not correct",404))
        }
        user.password=req.body.newPassword
        await user.save()
        sendResponse(user,200,res)
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