const WorkoutDetail = ({ workout }) => {
  return (
    <div className="w-full shadow-lg flex flex-col">
      <p>{workout.title}</p>
      <p> Load: {workout.load}</p>
      <p>Reps: {workout.reps}</p>
    </div>
  );
};

export default WorkoutDetail;
