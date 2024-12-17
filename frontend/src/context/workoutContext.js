import React, { useContext, useReducer } from "react";

const WorkoutContext = React.createContext();

const initialState = {
  workouts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload),
      };

    default:
      return state;
  }
};

const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkout = () => {
  const { workouts, dispatch } = useContext(WorkoutContext);
  return { workouts, dispatch };
};
export { WorkoutProvider, useWorkout };
