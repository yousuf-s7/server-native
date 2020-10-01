const express = require("express");
const mongoose = require("mongoose");
const tokenAuth = require("../middlewares/tokenAuth");

const route = express.Router();
const Track = mongoose.model("Track");

route.use(tokenAuth);

route.get("/gettracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

route.post("/newtrack", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations)
    return res.status(422).send({ error: "Please be specific" });

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = route;
