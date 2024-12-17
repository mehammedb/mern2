import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import LoginPage from "./pages/Login";
import { useUserContext } from "./context/userContext";
import SignUpPage from "./pages/Signup";

function App() {
  const { user } = useUserContext();
  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
