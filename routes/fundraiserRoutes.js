var express = require('express')
var router = express.Router()
var{getFundraisers,getFundraiser,createFundraiser,updateImage,getImage,getMyFundraisers}=require("../controllers/fundraiser")
const {protect}=require("../middleware/protect")

router.post('/create',protect,createFundraiser);
router.get('/all',getFundraisers);
router.post('/updateimage',protect,updateImage) 
router.get('/getImage',protect,getImage)
router.get('/mycampaigns',protect,getMyFundraisers);
router.get('/:id',getFundraiser);
module.exports = router 
