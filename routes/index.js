const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { notFound } = require("../utils/errors");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(notFound).send({ message: "Router not found" });
});

module.exports = router;
