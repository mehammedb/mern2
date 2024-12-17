import { useEffect } from "react";
import WorkoutDetail from "./WorkoutDetail";
import WorkoutForm from "./WorkoutForm";
import { useWorkout } from "../context/workoutContext";
import { useUserContext } from "../context/userContext";

const Home = () => {
  const { workouts, dispatch } = useWorkout();
  const { user } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      console.log("mameawa", user);
      try {
        const response = await fetch("/api/workouts", {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
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
    if (user) {
      fetchData();
    }
  }, []);

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
