const mongoose = require("mongoose");

const ForgetPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  isUsed: {
    type: Boolean,
    required: false,
  },
});

const ForgetPassword = mongoose.model("forgetPassword", ForgetPasswordSchema);

module.exports = ForgetPassword;
