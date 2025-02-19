import "./App.css";
import { Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";
//import Plansform from "./pages/Plansform";
import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import Footer from "./pages/Footer";

function App() {
  return (
    <>
      <div className=" bg-gray-400 overflow-auto container mx-auto h-screen ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />

          {/* <Route path="/" element={<Home />} />
        <Route path="/:pageform" element={<Plansform />} />
     */}
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
