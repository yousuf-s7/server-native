const mongoose = require("mongoose");

const uri = "uri from mongo Atlas";

//Establishing connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () =>
  console.log("successfully connected to mongo..")
);
mongoose.connection.on("error", (err) => console.log("Error", err));

//defining schema model
const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.model("User", userSchema);
