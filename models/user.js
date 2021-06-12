var mongoose=require('mongoose')
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const errorResponse=require('../utils/errorResponse');

const userSchema = mongoose.Schema({
      name:{
        type: String,
        required: [true, "Please add a name"],
      },
      email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
      },
      createdAt: {
        type: Date,
        default: Date.now(), 
      },
      totalDonation:{
        type:String,
        default:"0"
      }
})

//encrypt password before saving

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
		next();
	}
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

// Authenticate User with password and hashed password in db
userSchema.methods.authPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  // JWT signature
userSchema.methods.getJWTSignature = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
	expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports=mongoose.model('User',userSchema)