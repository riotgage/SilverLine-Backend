const { Mongoose } = require('mongoose');
const Fundraiser=require('../models/fundraiser')
const errorResponse=require('../utils/errorResponse');
const path=require('path');

//@desc Get All Fundraisers
//@Route Get /api/v1/fundraisers
//@access Public
exports.getFundraisers= async(req,res,next)=>{
    try{
        let query= Fundraiser.find();
        const page = parseInt(req.query.page, 10) || 1;
        const limit = 2;
        const startIndex=limit*(page-1);
        const endIndex = page * limit;
        const total = await Fundraiser.countDocuments();
        query.skip(startIndex).limit(limit);
        const pagination = {};

        if (endIndex < total) {
          pagination.next = {
            page: page + 1,
            limit,
          };
        }
      
        if (startIndex > 0) {
          pagination.prev = {
            page: page - 1,
            limit,
          };
        }
        const fundraisers=await query;
        res.status(200).json({fundraisers,pagination})
    }catch(error){
        next(error)
    }
}

//@desc Get One Fundraiser
//@Route Get /api/v1/fundraisers/:id
//@access Public
exports.getFundraiser= async(req,res,next)=>{
    try{
        const fundraiser=await Fundraiser.findById(req.params.id).populate('user');
        if(!fundraiser){
            next(new errorResponse(`Fundraiser not found with id ${req.params.id}`,400))
        }
        res.status(200).json({
            success:true,
            msg:fundraiser
        });
    }catch(error){
       
        next(error) 
    }
}

//@desc Create new Fundraiser
//@Route POST /api/v1/fundraiser/
//@access Private
exports.createFundraiser=async (req,res,next)=>{
    try{
        //Add user to req.body
        req.body.user =req.user.id

        let fundraiser= await Fundraiser.create(req.body)
        fundraiser.populate('user', function (err) {
            res.status(201).json({
                success:true,     
                data:fundraiser  
            }) 
        });
       
    }catch(error){
        next(error)
    }
    
}