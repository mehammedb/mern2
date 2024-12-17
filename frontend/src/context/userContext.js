import React, { useContext, useReducer } from "react";

const UserContext = React.createContext();

const initial_state = { user: null };
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initial_state);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const { user, dispatch } = useContext(UserContext);
  return { user, dispatch };
};

export { UserContextProvider, useUserContext };
