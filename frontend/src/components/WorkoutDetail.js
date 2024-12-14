import { useWorkout } from "../context/context";
import DeleteButton from "./DeleteButton";

const WorkoutDetail = ({ workout }) => {
  const { dispatch } = useWorkout();
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/workouts/" + workout._id, {
        method: "DELETE",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json._id });
      }
    } catch (error) {}
  };

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
