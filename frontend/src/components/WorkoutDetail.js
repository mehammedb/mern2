import DeleteButton from "./DeleteButton";

const WorkoutDetail = ({ workout }) => {
  const handleDelete = () => {};

  return (
    <div className="w-full shadow-lg flex flex-row justify-between p-2">
      <div className="">
        <p className="font-bold pb-4 text-lg text-green-700">{workout.title}</p>
        <p> Load: {workout.load}</p>
        <p>Reps: {workout.reps}</p>
      </div>
      <DeleteButton onDelete={handleDelete} />
    </div>
  );
};

export default WorkoutDetail;
