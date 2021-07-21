const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth");

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('db connected successfully'))
  .catch(err => {
    console.log(err);
  });


app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(3003, () => {
  console.log('server running on port 3003');
});