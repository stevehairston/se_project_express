const User = require("../models/user");

const getUsers = (req, res) => {
  const { userId } = req.params;
  User.find({})
    .then((users) => res.send(users).status(200).send(users))
    .catch((err) => {
      console.error(err);
      if (err.name === "") {
        // "COMPLETE LOGIC"
      }
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(500).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const {userId} = req.params;
  User.findById(userId)
  .orFail()
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    console.error(err);
    // if (err.name === "DcoumentNotFoundError") {
      // COMPLETE LOGIC A 404
    // } else if ( err.name === "CastError"
      // COMPLETE LOGIC TO HANDLE CAST ERROR
      // HERE WANT A 400 OTHERWISE THE 500 BELOW
    // ) {
    // }
    return res.status(500).send({ message: err.message });
  });
};

module.exports = { getUsers, createUser, getUser };
