const  Insta = require( "instamojo-nodejs");
const express=require('express'); 
const router = express.Router();

router.post("/", (req, res) => {
  Insta.setKeys(
    "test_b32e278263c9e6eb06db4b0d75e",
    "test_4f6d392cc6df3621c36c41751d5"
  );
  const data = new Insta.PaymentData();
    Insta.isSandboxMode(true)
  data.purpose = "Test";
  data.amount = 9;
  const REDIRECT_URL="https://www.udemy.com/home/my-courses/learning/"
  data.setRedirectUrl(REDIRECT_URL);

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      console.log(response)
      console.log(Object.keys(response)); 
      const redirectUrl = response["payment_request"];
      res.status(200).json(redirectUrl);
    }
  });
});   
  
module.exports = router
