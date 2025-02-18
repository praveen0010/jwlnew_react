import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Plansform from "./pages/Plansform";

function App() {
  return (
    <div className="bg-purple-100 overflow-auto container mx-auto h-screen ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pageform" element={<Plansform />} />
      </Routes>
    </div>
  );
}

export default App;
