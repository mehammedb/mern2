import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { WorkoutProvider } from "./context/context";

function App() {
  return (
    <div className="">
      <WorkoutProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </WorkoutProvider>
    </div>
  );
}

export default App;
