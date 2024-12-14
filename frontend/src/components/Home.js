import { useEffect, useState } from "react";

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
        <div key={wo._id} className="w-full shadow-lg flex flex-col">
          <p>{wo.title}</p>
          <p> Load: {wo.load}</p>
          <p>Reps: {wo.reps}</p>
        </div>
      ))}
    </div>
  );
};
export default Home;
