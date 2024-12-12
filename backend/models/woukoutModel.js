const mongoose = require("mongoose");
const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    load: { type: Number, required: true, min: 1 },
    reps: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
module.exports = Workout;
