const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const { validateEmail, SecretKey } = require("../service/commonService");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
  const request = new User(req.body);

  try {
    const dbUser = await User.exists({ email: request.email });

    if (dbUser != null) {
      res.send({ status: 9999, message: "User already exist!" }).status(200);
    } else {
      if (!validateEmail(request.email)) {
        res
          .send({ status: 9999, message: "Please Enter Valid Email" })
          .status(200);
      }
      if (!request.role) {
        request.role = "public";
      }
      await request.save();
      res.send({ status: 0000, message: "success" }).status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/delete", async (req, res) => {
  let body = req.body;

  try {
    const data = await User.deleteOne({ email: body.email });
    res.send({ status: 0000, message: "success" }).status(200);
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/signin", async (req, res) => {
  let body = req.body;

  try {
    if (body.email && body.password) {
      const isExistEmail = await User.findOne({
        email: body.email,
        password: body.password,
      });

      if (isExistEmail) {
        res
          .send({
            status: "0000",
            message: "Successfully login!",
            data: isExistEmail,
          })
          .status(200);
      } else {
        res
          .send({ status: "9999", message: "Invalid credentials!" })
          .status(200);
      }
    } else {
      if (body.email) {
        const isExistEmail = await User.findOne({
          email: body.email,
        });

        if (isExistEmail) {
          res
            .send({
              status: "0000",
              message: "Successfully login!",
              data: isExistEmail,
            })
            .status(200);
        } else {
          res
            .send({ status: "9999", message: "Invalid credentials!" })
            .status(200);
        }
      }
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.post("/reset", async (req, res) => {
  let body = req.body;

  try {
    if (body.email && body.password) {
      const isExistEmail = await User.findOne({
        email: body.email,
      });

      if (isExistEmail) {
        isExistEmail.password = body.password;
        await isExistEmail.save();
        res
          .send({
            status: "0000",
            message: "Successfully login!",
            data: isExistEmail,
          })
          .status(200);
      } else {
        res
          .send({ status: "9999", message: "Invalid credentials!" })
          .status(200);
      }
    }
  } catch (error) {
    console.log("error : ", error.message);
    res.send({ status: 9999, message: "Something went wrong!" }).status(200);
  }
});

router.get("/getUsers", async (req, resp) => {
  try {
    const list = await User.find();
    resp
      .send({
        status: "0000",
        message: "Successfully login!",
        data: list,
      })
      .status(200);
  } catch (error) {
    console.log("error : ", error);
    resp.status(500).send(error);
  }
});

router.post("/update", async (req, resp) => {
  const request = new User(req.body);
  try {
    const userDb = await User.findOne({ email: request.email });
    if (userDb) {
      userDb["firstName"] = request.firstName;
      userDb["lastName"] = request.lastName;
      userDb["email"] = request.email;
      userDb["password"] = request.password;
      await userDb.save();

      resp
        .send({
          status: "0000",
          message: "Update Successfully!",
        })
        .status(200);
    } else {
      resp
        .send({
          status: "9999",
          message: "Invalid request!",
        })
        .status(200);
    }
  } catch (error) {
    console.log("error : ", error);
    resp.status(500).send(error);
  }
});

router.post("/find-user", async (request, response) => {
  const user = new User(request.body);

  try {
    const data = await User.find({ email: user.email });
    response.send(data);
  } catch (error) {
    console.log("error : ", error);
    response.status(500).send(error);
  }
});
router.post("/signup-google", async (request, response) => {
  let body = request.body;
  const user = new User(request.body);

  try {
    if (body.email) {
      const isExistEmail = await User.findOne({
        email: body.email,
      });

      if (isExistEmail) {
        response
          .send({
            status: "9999",
            message: "Already registered!",
          })
          .status(200);
      } else {
        const savedUser = await user.save();
        response
          .send({
            status: "0000",
            message: "Successfully registered!",
            data: savedUser
          })
          .status(200);
      }
    }
  } catch (error) {
    console.log("error : ", error.message);
    response
      .send({ status: 9999, message: "Something went wrong!" })
      .status(200);
  }
});

module.exports = router;
