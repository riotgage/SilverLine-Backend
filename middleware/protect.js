const jwt=require('jsonwebtoken')
const ErrorResponse=require("../utils/errorResponse")
const User=require("../models/user")

exports.protect=async function(req, res,next){
    try {
        let token;
        if(
            req.headers.authorization && 
            req.headers.authorization.startsWith('Bearer')){
                token=req.headers.authorization.split(' ')[1];
        }
        else if(req.cookies && req.cookies.token){
            token=req.cookies.token
        }

        if(!token){
            return next(new ErrorResponse("Not Authorized to access this route",401));
        }
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.user=await User.findById(decoded.id);
            next()
        }catch(error){
            return next(new ErrorResponse("Not Authorized to access this route",401));
        }
    }catch(error){
        next(error)
    }
}