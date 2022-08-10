const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connection is successfull");
  })
  .catch((e) => {
    console.log("no connection", e);
  });
