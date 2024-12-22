const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// router.get("/", () => console.log("GET users"));
router.get("/", getUsers);
router.get("/:userId", getUser);
// router.post("/", createUser);

// router.get("/users", getUsers);
router.get("/users/:userId", getUser);
// router.post("/users", createUser);

module.exports = router;
