import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Nav = () => {
  const { user, dispatch } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="w-full p-3 bg-green-400 flex flex-row justify-between">
      <Link to="/">
        <p>Home page</p>
      </Link>
      {!user && (
        <div className="flex flex-row gap-2">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      {user && (
        <div className="">
          <span>{user.email}</span>
          <button onClick={handleLogout} className="p-2 border">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
