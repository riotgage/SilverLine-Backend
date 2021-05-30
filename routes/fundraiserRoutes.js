var express = require('express')
var router = express.Router()
var{getFundraisers,getFundraiser,createFundraiser,updateImage,getImage}=require("../controllers/fundraiser")
const {protect}=require("../middleware/protect")

router.post('/create',protect,createFundraiser);
router.get('/all',getFundraisers);
router.post('/updateimage',protect,updateImage) 
router.get('/getImage',protect,getImage)
router.get('/:id',getFundraiser);

module.exports = router 
