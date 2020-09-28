const express = require("express");
require("./services/mongoSer");
const bodyParser = require("body-parser");

const authRoutes = require("./authRoutes/authRoutes");
const tokenAuth = require("./middlewares/tokenAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

app.get("/", tokenAuth, (req, res) => {
  res.send(`your email is ${req.user.email}`);
});

app.listen(3000, () => console.log("server online on 3000..."));
