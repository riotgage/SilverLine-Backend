const express = require("express");
const { payment,donate } = require("../controllers/payment");
const { redirect } = require("../controllers/payment");
const router = express.Router();
const {protect}=require("../middleware/protect")

router.post("/pay", payment);
router.get("/callback/", redirect);
router.get("/donate",donate);
module.exports = router;
     