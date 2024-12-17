const {
  createWorkout,
  getSingleWorkout,
  getAllWorkouts,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControl");
const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const route = express.Router();

route.use(requireAuth);
route.get("/", getAllWorkouts);
route.post("/", createWorkout);
route.get("/:id", getSingleWorkout);
route.patch("/:id", updateWorkout);
route.delete("/:id", deleteWorkout);

module.exports = route;
