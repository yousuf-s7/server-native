const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");
const route = express.Router();

route.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    // console.log("done saving");
    // console.log(user._id);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    if (error.name === "MongoError")
      return res.status(422).send("User already exists");
    if (error.name === "ValidationError")
      return res.status(422).send(`${error.message}`);
  }
});

route.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ error: "Email and Password are necessary" });
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ error: "Enter a valid Email-ID" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(404).send({ error: "you've entered a wrong password" });
  }
});

module.exports = route;
