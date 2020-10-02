require("./services/mongoSer");
require("./services/trackstoMongo");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const tokenAuth = require("./middlewares/tokenAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/", tokenAuth, (req, res) => {
  res.send(`your email is ${req.user.email}`);
});

app.listen(3000, () => console.log("server online on 3000..."));

//some random commit
//random comment for checking cloning