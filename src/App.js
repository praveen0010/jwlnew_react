import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Plansform from "./pages/Plansform";
import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
//import Footer from "./pages/Footer";
import Adminform from "./pages/Adminform";
import Admindashbord from "./pages/Admindashbord";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [isadmin, setisadmin] = useState(false);
  const handellogin = (name, pass) => {
    if (name === "Admin" && pass === "Admin") {
      setisadmin(true);
      return true;
    }
    return false;
  };
  return (
    <>
      <div className="  overflow-auto container mx-auto h-screen  relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Home" element={<Hero />} />

          {/* <Route path="/" element={<Home />} />
           */}
          <Route path="/Home/Silverform" element={<Plansform />} />
          <Route path="/Home/Goldform" element={<Plansform />} />
          <Route path="/Home/Chitform" element={<Plansform />} />

          <Route path="/Admin" element={<Adminform onlogin={handellogin} />} />
          <Route
            path="/Admindashboard"
            element={isadmin ? <Admindashbord /> : <Navigate to="/Admin" />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
