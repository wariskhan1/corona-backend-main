const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  auth: {
    user: "artisttesttesting@gmail.com",
    pass: "emuvezdvtcxlpzdt",
  },
});

router.post("/send-email", async (req, res) => {
  let body = req.body;
  var mailOptions = {
    from: "artisttesttesting@gmail.com",
    to: body.email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  try {
    if (body.email) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res
        .send({
          status: "0000",
          message: "success",
        })
        .status(200);
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

module.exports = router;
