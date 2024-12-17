import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutProvider } from "./context/workoutContext";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </UserContextProvider>
  </React.StrictMode>
);
