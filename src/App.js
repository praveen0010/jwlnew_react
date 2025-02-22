import "./App.css";
import { Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";
import Plansform from "./pages/Plansform";
import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import Footer from "./pages/Footer";
import Adminform from "./pages/Adminform";
import Admindashbord from "./pages/Admindashbord";

function App() {
  return (
    <>
      <div className="  overflow-auto container mx-auto h-screen  relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />

          {/* <Route path="/" element={<Home />} />
           */}
          <Route path="/:pageform" element={<Plansform />} />
          <Route path="/Admin" element={<Adminform />} />
          <Route path="/Admindashbord" element={<Admindashbord />} />
        </Routes>

        
      </div>
    </>
  );
}

export default App;
