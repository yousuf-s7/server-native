require("./services/mongoSer");
const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./authRoutes/authRoutes");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

app.get("/hi", (req, res) => {
  res.send("Very welcome");
});

app.listen(3000, () => console.log("server online on 3000..."));
