const nodemailer = require("nodemailer");

const sendMail = (mailInfo) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tobiburrohman2@gmail.com",
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  var mailOptions = {
    from: "tobiburrohman2@gmail.com",
    to: mailInfo?.email,
    subject: "Payment Transaction Information",
    text: `HI Mr. ${mailInfo?.email}. Thank your for your $${mailInfo?.price} payment .Your Shipping order is ${mailInfo?.shippingOrder} and your transaction ID is ${mailInfo?.transactionId}.Thank You.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      // console.log("Email sent: " + info.response);
      res.status(200).json({ status: "Email was sent!", code: 200 });
    }
  });
};
module.exports = sendMail;
