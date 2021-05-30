var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");

const fundRaiserSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  purpose: {
    type: [String],
    required: [true, "Please add a purpose for fundraiser"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  avatar: {
    type: String,
    default: "default.jpg",
    trim: true,
  },
  target: {
    type: String,
    required: [true, "Please add a target Amount"],
  },
  beneficiary: {
    type: String,
    required: [true, "Please add a Beneficiary"],
  },
  city: {
    type: String,
    required: [true, "Please add your city"],
  },
  desc: {
    type: String,
    required: [true, "Please add a description "],
    maxlength: [300, "Password must be at least 300 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("FundRaiser", fundRaiserSchema);
