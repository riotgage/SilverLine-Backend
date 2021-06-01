const errorResponse = require("../utils/errorResponse");
exports.errorHandler=(error,req,res,next)=>{
    err=error

    //Duplicate ID error
    if(error.code===11000){
        message=""
        Object.keys(error.keyValue).forEach(key=>{
            message+=`${key} `
        })
        message+=`already exist`
        console.log(`${error.key}`)
        err=new errorResponse(message,400)
    }
    res.status(err.statusCode || 400).json({
        success:false,
        error:err.message || "Server Error"    
    });
}