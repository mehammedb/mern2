const {
  createWorkout,
  getSingleWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControl");
const express = require("express");
const route = express.Router();

route.get("/", getAllWorkouts);
route.post("/", createWorkout);
route.get("/:id", getSingleWorkout);
route.patch("/:id", updateWorkout);
route.delete("/:id", deleteWorkout);

module.exports = route;
