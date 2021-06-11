const { Mongoose } = require("mongoose");
const Fundraiser = require("../models/fundraiser");
const errorResponse = require("../utils/errorResponse");
const path = require("path");
const multer = require("multer");
//@desc Get All Fundraisers
//@Route Get /api/v1/fundraisers
//@access Public
exports.getFundraisers = async (req, res, next) => {
  try {

    var category=req.body.category;
    console.log(category);
    let pagination = {};

    let query;
    if(category){
      query=Fundraiser.find({
        purpose:{$in:category}
      })
    }else{
      query = Fundraiser.find();
    }
    const page = parseInt(req.query.page, 10);
    if(page){
      const limit = 2;
      const startIndex = limit * (page - 1);
      const endIndex = page * limit;
      const total = await Fundraiser.countDocuments();
      query.skip(startIndex).limit(limit);

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
    }
    const fundraisers = await query;
    res.status(200).json({ fundraisers, pagination });
  } catch (error) {
    next(error);
  }
};

//@desc Get One Fundraiser
//@Route Get /api/v1/fundraisers/:id
//@access Public
exports.getFundraiser = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id).populate(
      "user"
    );
    if (!fundraiser) {
      next(
        new errorResponse(`Fundraiser not found with id ${req.params.id}`, 400)
      );
    }
    res.status(200).json({
      success: true,
      msg: fundraiser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyFundraisers=async (req, res, next) => {
  var email=req.user.email;
  let query=Fundraiser.find({
    email
  })
  query.limit(3);
  const fundraisers = await query;
  res.status(200).json({ fundraisers});
}

//@desc Create new Fundraiser
//@Route POST /api/v1/fundraiser/
//@access Private
const uploadDir = path.join(__dirname, "../uploads");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.name = uniqueSuffix + file.originalname;
    cb(null, req.name);
  },
});

var upload = multer({ storage: storage }).single("avatar");

exports.createFundraiser = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      const obj = JSON.parse(JSON.stringify(req.body));
      obj.user = req.user.id;
      console.log(obj);
      obj.avatar = req.name;
      let fundraiser = await Fundraiser.create(obj);
      res.send({
        success: true,
        fundraiser: fundraiser,
      });
    });
  } catch (e) {
    return next({
      status: 404,
      message: e.message,
    });
  }
};

exports.updateImage = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      console.log(req.body.id);
      let fundraiser = await Fundraiser.findOne({ _id: req.body.id });
      fundraiser.avatar = req.name;
      await fundraiser.save();
      res.send({
        success: true,
        fundraiser: fundraiser,
      });
    });
  } catch (e) {
    return next({
      status: 404,
      message: e.message,
    });
  }
};

exports.getImage = async (req, res, next) => {
  try {
    let fundraiser = await Fundraiser.findOne({ _id: req.body.id });
    var img = path.join(__dirname, "../uploads/" + fundraiser.avatar);
    res.sendFile(img);
  } catch (e) {
    return next({
      status: 404,
      message: e.message,
    });
  }
};
