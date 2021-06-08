var express = require('express')
var router = express.Router()
var{login,register,logout,getCurrentUser,updateUserPassword}=require("../controllers/auth")
const {protect}=require("../middleware/protect")

router.post('/login',login);
router.post('/register',register);
router.get('/logout',protect,logout);
router.get('/currentuser',protect,getCurrentUser);
router.post('/updatePassword',protect,updateUserPassword);

module.exports = router
