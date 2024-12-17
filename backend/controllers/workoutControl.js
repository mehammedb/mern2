const mongoose = require("mongoose");
const Workout = require("../models/woukoutModel");

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user;

  const emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "All fields are mandatory!", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getAllWorkouts = async (req, res) => {
  const user_id = req.user;
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format!" });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Unexpected error" });
  }
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format!" });
  }
  try {
    const workout = await Workout.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!workout) {
      return res.status(404).json({ error: "workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getSingleWorkout,
  updateWorkout,
  deleteWorkout,
};
