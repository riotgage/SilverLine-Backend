const express = require("express");
const {payment}=require("../controllers/payment")
const router = express.Router();

router.post("/",payment);

module.exports = router;