const express = require("express");
const router = express.Router();
const Information = require("../models/InformationSchema");


router.post("/save", async (req, res) => {
  const request = new Information(req.body);
  try {
    const dbUser = await Information.findOne({
      email: request.email,
      date: request.date,
    });
    if (dbUser != null) {
      let requestList = request?.infoList;
      if (requestList?.length) {
        let currentList = dbUser["infoList"];
        requestList.map((m) => currentList.push(m));
        dbUser["infoList"] = currentList;
        dbUser.save();
      }
      res.send({ status: 0000, message: "success" }).status(200);
    } else {
      await request.save();
      res.send({ status: 0000, message: "success" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/fetch", async (req, res) => {
  let body = req.body;

  try {
    if (body.email) {
      //   const infoList = await Information.find({});
      const infoList = await Information.findOne({
        email: body.email,
        date: body.date,
      });

      res
        .send({
          status: "0000",
          message: "success",
          data: infoList,
        })
        .status(200);
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/fetch-by-email", async (req, res) => {
  let body = req.body;

  try {
    if (body.email) {
      //   const infoList = await Information.find({});
      const infoList = await Information.find({
        email: body.email,
      });

      res
        .send({
          status: "0000",
          message: "success",
          data: infoList,
        })
        .status(200);
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/find", async (request, response) => {
  const user = new User(request.body);

  try {
    const data = await Information.find({ email: user.email });
    response.send(data);
  } catch (error) {
    console.log("error : ", error);
    response.status(500).send(error);
  }
});

module.exports = router;
