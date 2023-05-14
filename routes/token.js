const express = require("express");
const router = express.Router();
const PasswordReset = require("../models/ResetSchema");
const User = require("../models/UserSchema");
const { generateString } = require("../service/commonService");
const nodemailer = require("nodemailer");

const username = "coronaapp458@gmail.com";
const password = "dvbdahdumglmuyso";
// const username = "artisttesttesting@gmail.com";
// const password = "emuvezdvtcxlpzdt";

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  auth: {
    user: username,
    pass: password,
  },
});

router.post("/forget", async (request, response) => {
  const body = new PasswordReset(request.body);

  console.log("body : ", body);
  try {
    if (body.email) {
      const user = await User.exists({ email: body.email });
      if (user != null) {
        const token = generateString(10).trim();
        body.token = token;
        body.isUsed = false;
        await body.save();

        var mailOptions = {
          from: username,
          to: body.email,
          subject: "Sending Email using Node.js",
          text: "That was easy!",
          html: `<p>Forgot password? Click the link to reset <b><a href='https://my-covid-diary-mg74.vercel.app/token?token=${token}'>Click here</a></b></p>`,
        };
        // html: `<p>Forgot password? Click the link to reset <b><a href='http://localhost:3000/token?token=${token}'>Click here</a></b></p>`,

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            response
              .send({ status: 9999, message: "Error while sending email!" })
              .status(200);
          } else {
            response.send({ status: "0000", message: "success" });
          }
        });
      }
    } else {
      console.log("body : ", body);
      response.send({ status: 9999, message: "Invalid call!" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    response
      .send({ status: 9999, message: "Something went wrong!" })
      .status(200);
  }
});

router.post("/validate", async (request, response) => {
  const body = new PasswordReset(request.body);

  try {
    if (body.token) {
      const Token = await PasswordReset.findOne({ token: body.token });
      if (Token != null && Token.isUsed == false) {
        Token.isUsed = true;
        await Token.save();
        response.send({ status: "0000", message: "success", data: Token });
      } else {
        response.send({ status: 9999, message: "Token expired!" }).status(200);
      }
    } else {
      response.send({ status: 9999, message: "Invalid Call!" }).status(200);
    }
  } catch (error) {
    response
      .send({ status: 9999, message: "Something went wrong!" })
      .status(200);
  }
});

module.exports = router;
