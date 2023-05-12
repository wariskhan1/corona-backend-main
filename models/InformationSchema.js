const mongoose = require("mongoose");

const InformationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  infoList: {
    type: Array,
    required: true,
  },
});

const Information = mongoose.model("information", InformationSchema);

module.exports = Information;
