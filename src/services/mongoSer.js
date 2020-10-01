const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

const uri = keys.uri;

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

userSchema.pre("save", convertToCrypt);
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

function convertToCrypt(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    // console.log("hashed", user.password);
    next();
  });
}

mongoose.model("User", userSchema);
