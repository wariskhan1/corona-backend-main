const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 3001;
const UserRoute = require("./routes/users");
const InformationRoute = require("./routes/information");
const EmailRoute = require("./routes/email");
const TokenRoute = require("./routes/token");

const app = express();
const cors = require("cors");

const username = "corona";
const password = "7J2bkB7OwrujJHLV";
const cluster = "<cluster name>";
const dbname = "corona";

app.get("/", (req, res) => {
  res.send("Express app working");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use("/user", UserRoute);
app.use("/info", InformationRoute);
app.use("/email", EmailRoute);
app.use("/email", EmailRoute);
app.use("/token", TokenRoute);


const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.jo03lew.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, async (err) => {
  if (err) throw err;
  console.log("conncted to db");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
