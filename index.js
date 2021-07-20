const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('db connected successfully'))
  .catch(err => {
    console.log(err);
  });

app.listen(3003, () => {
  console.log('server running on port 3003');
});