const {
  createWorkout,
  getSingleWorkout,
  getAllWorkouts,
} = require("../controllers/control");
const express = require("express");
const route = express.Router();

route.get("/", getAllWorkouts);
route.post("/", createWorkout);
route.get("/:id", getSingleWorkout);

module.exports = route;
