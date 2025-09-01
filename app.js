require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const registerRouter = require("./src/routers/level1/auth/register.router")
const loginRouter = require("./src/routers/level1/auth/login.router")
const forgetPasswordRouter = require("./src/routers/level1/auth/forget-password.router")
const courseStatusRouter = require("./src/routers/level1/courses/status/course.status.router")
const courseGroupRouter = require("./src/routers/level1/courses/courseGroup/courseGroup.router")
const app = express();

app.use(express.json());
app.use("/api", registerRouter)
app.use("/api", loginRouter)
app.use("/api", forgetPasswordRouter)
app.use("/api", courseStatusRouter)
app.use("/api", courseGroupRouter)

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGO_DB_URL;

// console.log("process.env.MONGO_DB_URL ==>", process.env.MONGO_DB_URL)

// .connect("mongodb://127.0.0.1:27017/mydatabase")
mongoose
  .connect(mongoDbUrl)
  .then(() => {
    app.listen(port, (listen) => {
      "listen ==>", listen;
    });
  })
  .catch((error) => console.log("Catch Error =>", error));
