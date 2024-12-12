const express = require("express");
const route = require("./routes/route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { collection } = require("./models/woukoutModel");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then((s) => {
    console.log("mongoose is conneced");
  })
  .catch((e) => {
    console.log("mongoose is not conneced");
  });

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/workouts", route);

app.listen(port, () => {
  console.log("App is listening on port " + port);
});
