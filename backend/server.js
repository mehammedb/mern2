const express = require("express");
const app = express();

app.listen(process.env.PORT || 400, () => {
  console.log("App is listtening on port " + process.env.PORT);
});
