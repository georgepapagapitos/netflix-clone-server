const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('db connected successfully'))
  .catch(err => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(3003, () => {
  console.log('server running on port 3003');
});