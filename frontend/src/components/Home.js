import { useEffect, useState } from "react";
import WorkoutDetail from "./WorkoutDetail";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/workouts");
        if (response.ok) {
          const json = await response.json();
          setWorkouts(json);
        } else {
          console.error("Failed to fetch workouts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchData();
  }, []);

  if (workouts.length === 0) {
    return <p>No workouts available.</p>;
  }

  return (
    <div className="flex flex-col gap-7 w-[600px] p-7">
      {workouts.map((wo) => (
        <WorkoutDetail key={wo._id} workout={wo} />
      ))}
    </div>
  );
};
export default Home;
