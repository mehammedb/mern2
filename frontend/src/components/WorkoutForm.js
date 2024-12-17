import { useState } from "react";
import { useWorkout } from "../context/workoutContext";
import { useUserContext } from "../context/userContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useUserContext();

  const { dispatch } = useWorkout();

  const handleForm = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in first!");
      return;
    }
    setIsDisable(true);
    const workout = { title, load, reps };
    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_WORKOUT", payload: json });
        setTitle("");
        setLoad("");
        setReps("");
        setError("");
        setIsDisable(false);
        setEmptyFields([]);
      } else {
        setError(json.error);
        setIsDisable(false);
        setEmptyFields(json.emptyFields);
      }
    } catch (error) {
      setError(error.message);
      setIsDisable(false);
    }
    setIsDisable(false);
  };

  return (
    <form onSubmit={handleForm} className="flex flex-col gap-4 w-[350px]">
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          className={`p-2 border ${
            emptyFields.includes("title") ? "border-red-400" : ""
          }`}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="load">Load:</label>
        <input
          type="number"
          name="load"
          className={`p-2 border ${
            emptyFields.includes("load") ? "border-red-400" : ""
          }`}
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
          className={`p-2 border ${
            emptyFields.includes("reps") ? "border-red-400" : ""
          }`}
          min={1}
          onChange={(e) => {
            setReps(e.target.value);
          }}
          value={reps}
        />
      </div>
      <button
        className={`text-white font-bold p-3 ${
          isDisable ? "bg-gray-400" : "bg-blue-600"
        }`}
        disabled={isDisable}
      >
        {isDisable ? "Adding workout..." : "Add workout"}
      </button>
      <p className={`${error && "text-red-500 border p-2 border-red-500"}`}>
        {error}
      </p>
    </form>
  );
};

export default WorkoutForm;
