const Insta = require("instamojo-nodejs");
const url = require("url");

exports.payment = async (req, res, next) => {
  Insta.setKeys(
    "test_b32e278263c9e6eb06db4b0d75e",
    "test_4f6d392cc6df3621c36c41751d5"
  );
  Insta.isSandboxMode(true);
  const data = new Insta.PaymentData();
  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.buyer_name = req.body.buyer_name;
  data.redirect_url = req.body.redirect_url;
  data.email = req.body.email;
  data.phone = req.body.phone;
  data.send_email = false;
  data.webhook = req.body.webhook_url;
  data.allowed_repeated_payments = false;
  Insta.createPayment(data, function (error, response) {
    if (error) {
      console.log(error);
      next(error);
    } else {
      const responseData = JSON.parse(response);
      console.log(response);
      const redirectUrl = responseData.payment_request.longurl;
      res.status(200).json(redirectUrl);
    }
  });
};

exports.redirect = async (req, res, next) => {
  let url_parts = url.parse(req.url, true),
    responseData = url_parts.query;

  if (responseData.payment_id) {
    return res.redirect("http://localhost:3000/");
  }
};


exports.donate=async(req,res,next)=>{
  const user=req.user;
  try{ 
    const fundraiser = await Fundraiser.findById(req.body.id);
    user.totalDonation=(parseInt(user.totalDonation)+req.body.donation).toString();
    await user.save();
    res.status(200).json({
      success: true,
      fundraiser: fundraiser,
      user:user
    });
  }catch(error){
    next(error);
  }
}