const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");

const { mongoUri } = config;

const mainRouter = require("./routes/index");
// const { login, createUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
