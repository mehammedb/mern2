import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { WorkoutProvider } from "./context/workoutContext";
import LoginPage from "./pages/Login";
import { UserContextProvider } from "./context/userContext";
import SignUpPage from "./pages/Signup";

function App() {
  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <UserContextProvider>
        <WorkoutProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </BrowserRouter>
        </WorkoutProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
