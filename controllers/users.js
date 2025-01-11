const User = require("../models/user");
const { badRequest, notFound, serverError } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res.status(serverError).send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(badRequest).send({ message: "Invalid data provided" });
      }
      return res.status(serverError).send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(badRequest).send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(notFound).send({ message: "Id provided was not found" });
      }
      return res.status(serverError).send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getUsers, createUser, getUser };
