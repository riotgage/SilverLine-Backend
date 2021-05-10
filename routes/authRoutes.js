var express = require('express')
var router = express.Router()
var{login,register,logout,getCurrentUser}=require("../controllers/auth")
const {protect}=require("../middleware/protect")

router.post('/login',login);
router.post('/register',register);
router.get('/logout',protect,logout);
router.get('/currentuser',protect,getCurrentUser);

module.exports = router
