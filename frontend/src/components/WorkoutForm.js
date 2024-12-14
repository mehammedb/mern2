import { useState } from "react";
import { useWorkout } from "../context/context";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useWorkout();

  const handleForm = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_WORKOUT", payload: json });
        setError("");
      } else {
        setError(json.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleForm} className="flex flex-col gap-4 w-[350px]">
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          className="p-2 border"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="load">Load:</label>
        <input
          type="number"
          name="load"
          className="p-2 border"
          min={1}
          onChange={(e) => {
            setLoad(e.target.value);
          }}
          value={load}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="reps">Reps</label>
        <input
          type="number"
          name="reps"
          className="p-2 border"
          min={1}
          onChange={(e) => {
            setReps(e.target.value);
          }}
          value={reps}
        />
      </div>
      <button className="bg-blue-600 text-white font-bold p-3">
        Add workout
      </button>
      {error}
    </form>
  );
};

export default WorkoutForm;
