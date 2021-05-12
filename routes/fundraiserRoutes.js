var express = require('express')
var router = express.Router()
var{getFundraisers,getFundraiser,createFundraiser}=require("../controllers/fundraiser")
const {protect}=require("../middleware/protect")

router.post('/create',protect,createFundraiser);
router.get('/all',getFundraisers);
router.get('/:id',getFundraiser);


module.exports = router
