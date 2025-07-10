const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL.",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "You must enter a valid email address.",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
console.log("Received email:", email);
console.log("Received password:", password);


  return this.findOne({ email })
    .select("+password")
    .then((user) => {
console.log("Found user:", user);
      if (!user) {
        console.log("⛔ No user found with that email");
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
console.log("Password matched result:", matched);
        if (!matched) {
          console.log("Passwords do not match");
          return Promise.reject(new Error("Incorrect email or password"));
        }
console.log("🎉 Auth successful:", user.email);
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
