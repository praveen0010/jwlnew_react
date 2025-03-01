import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Plansform from "./pages/Plansform";
import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import axios from "axios";
import Adminform from "./pages/Adminform";
import Admindashbord from "./pages/Admindashbord";
import PageNotFound from "./pages/PageNotFound";
import Resetpassword from "./pages/Resetpassword";

function App() {
  const [isadmin, setisadmin] = useState(false);
  const navigate = useNavigate();
  const [loginerror, setloginerror] = useState("");
  const [isloading, setisloading] = useState(false);

  const [pricedata, setpricedata] = useState({
    golden: "",
    silver: "",
    chittu: "",
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/prices/getPrices`)
      .then((response) => {
        const price = {
          chittu: response?.data?.[0]?.chittu,
          golden: response?.data?.[0]?.golden,
          silver: response?.data?.[0]?.silver,
        };
        setpricedata(price);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    return () => {
      setpricedata({});
    };
  }, []);

  const handellogin = async (email, password) => {
    try {
      setisloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/adminlogin`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setisloading(false);
        setisadmin(true);
        navigate("/Admindashboard"); // Redirect to admin panel
        return true;
      } else {
        setisloading(false);
        setloginerror(response.message);
      }
    } catch (err) {
      setisloading(false);
      setloginerror(err?.message);
      setisadmin(false);
      return false;
    }
  };
  return (
    <>
      <div className="  overflow-auto  mx-auto h-screen  relative ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Home" element={<Hero />} />
          <Route
            path="/Home/Goldform"
            element={
              <Plansform
                planlist={["1gm", "2gms", "4gms", "8gms"]}
                pageheading="Gold Plan"
                btnclass="proceedtopaybtngold"
              />
            }
          />
          <Route
            path="/Home/Silverform"
            element={
              <Plansform
                planlist={["1gm", "2gms", "5gms", "10gms"]}
                pageheading="Silver Plan"
                btnclass="proceedtopaybtnsilver"
              />
            }
          />
          <Route
            path="/Home/Chitform"
            element={
              <Plansform
                planlist={["10,00000", "20,00000", "50,00000"]}
                pageheading="Chit Plan"
                btnclass="proceedtopaybtnchit"
              />
            }
          />

          <Route
            path="/Admin"
            element={
              <Adminform
                onlogin={handellogin}
                loginerr={loginerror}
                isloading={isloading}
                setisloading={setisloading}
              />
            }
          />
          <Route
            path="/Admindashboard"
            element={
              isadmin ? (
                <Admindashbord
                  pricedata={pricedata}
                  setpricedata={setpricedata}
                />
              ) : (
                <Navigate to="/Admin" />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />

          <Route path="/Resetpassword" element={<Resetpassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
