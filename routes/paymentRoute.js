const express = require("express");
const { payment } = require("../controllers/payment");
const { redirect } = require("../controllers/payment");
const router = express.Router();

router.post("/pay", payment);
router.get("/callback/", redirect);

module.exports = router;
