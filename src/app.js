const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json());

const port = process.env.PORT || 3000;
const mongoDbUrl = process.env.MONGODB_URI;

mongoose
  .connect("mongodb://127.0.0.1:27017/products")
  .then(() => {
    app.listen(port, (listen) => {
      "listen ==>", listen;
    });
  })
  .catch((error) => console.log("Catch Error =>", error));
