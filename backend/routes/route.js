const getAllWorkouts = require("../controllers/control");
const express = require("express");
const route = express.Router();

route.get("/", getAllWorkouts);

module.exports = route;
