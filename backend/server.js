const express = require("express");
const route = require("./routes/route");
const app = express();

const port = process.env.PORT || 4000;

app.use("/api/workouts", route);

app.listen(port, () => {
  console.log("App is listening on port " + port);
});
