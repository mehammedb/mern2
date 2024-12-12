const getAllWorkouts = (req, res) => {
  res.status(200).json({ msg: "You are accessing all workouts!" });
};

module.exports = getAllWorkouts;
