import { useEffect } from "react";
import WorkoutDetail from "./WorkoutDetail";
import WorkoutForm from "./WorkoutForm";
import { useWorkout } from "../context/context";

const Home = () => {
  const { workouts, dispatch } = useWorkout();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/workouts");
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_WORKOUT", payload: json });
        } else {
          console.error("Failed to fetch workouts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchData();
  }, [workouts]);

  if (workouts.length === 0) {
    return (
      <div className="flex flex-row justify-around">
        <p>No workouts available.</p>
        <WorkoutForm />
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col gap-7 w-[600px] p-7">
        {workouts.map((wo) => (
          <WorkoutDetail key={wo._id} workout={wo} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};
export default Home;
