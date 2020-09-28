const mongoose = require("mongoose");

const uri =
  "mongodb+srv://yousuf:oFayB7iuLW6Jn1j3@reactnative.6qrxi.gcp.mongodb.net/reactNative?retryWrites=true&w=majority";

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
