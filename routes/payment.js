const express = require("express");
const Insta = require("instamojo-nodejs");

const router = express.Router();

router.post("/pay", (req, res) => {
  Insta.setKeys(
    "test_b32e278263c9e6eb06db4b0d75e",
    "test_4f6d392cc6df3621c36c41751d5"
  );
  const data = new Insta.PaymentData();

  data.purpose = req.data.purpose;
  data.amount = req.data.amount;
  data.buyer_name = req.body.buyer_name;
  data.redirect_url = req.body.redirect_url;
  data.email = req.body.email;
  data.phone = req.body.phone;
  data.send_email = false;
  data.webhook = "http:www.example.com/webhook/";
  data.allowed_repeated_payments = false;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      const redirectUrl = response.payment_request.longurl;
      console.log(response);
      res.status(200).json(redirectUrl);
    }
  });
});

module.exports = router;
