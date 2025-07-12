const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  badRequest,
  notFound,
  serverError,
  unauthorized,
  conflict,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(conflict).send({ message: "Email already exists." });
      }
      if (err.name === "ValidationError") {
        return res
          .status(badRequest)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(badRequest)
      .send({ message: "Email and password are required" });
  }

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.send({ token });
  } catch (error) {
    return res
      .status(unauthorized)
      .send({ message: "Incorrect email or password" });
  }
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(badRequest).send({ message: "Invalid user ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(notFound).send({ message: "User not found" });
      }
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(badRequest)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(notFound).send({ message: "User not found" });
      }
      return res
        .status(serverError)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
