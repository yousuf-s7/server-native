const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const route = express.Router();

route.get("/home", (req, res) => {
  res.send("Happy Home Mate");
});

route.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    console.log("done saving");
    // console.log(user._id);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send(token);
  } catch (error) {
    res.status(422).send(error.message);
  }
});

module.exports = route;
