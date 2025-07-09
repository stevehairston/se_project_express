// const token = authorization.replace("Bearer ", "");
const jwt = require("jsonwebtoken");

const JWT_SECRET = require("../utils/config");
const { unauthorized } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(unauthorized).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res
      .status(unauthorized)
      .send({ message: "Invalid or expired token" });
  }
};
