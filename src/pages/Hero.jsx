import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import herobg from "../Assets/images/herobg.png";
import Herogirl from "../Assets/images/Herogirl.png";
import Footer from "./Footer";
const Hero = () => {
  return (
    <>
      <div className="md:pt-32 pt-16 bg-green-300">
        <div
          style={{ backgroundImage: `url(${herobg})` }}
          className=" 
       pb-0  bg-gray-500
      w-full  bg-center md:bg-cover bg-contain md:flex-row flex lg:justify-normal justify-center
         flex-col    gap-8 md:gap-0 p-3 pt-12"
        >
          <div className="order-2 md:order-1 ">
            <img
              src={Herogirl}
              className="w-[600px] h-full md:w-full md:h-full  "
              alt="heroimg"
            />
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center items-center     md:h-auto gap-10 md:pr-10   lg:pl-16">
            <h1 className="text-center text-white text-5xl font-extrabold">
              சேலம் ஜுவல்லரி
            </h1>
            <h4 className="text-center text-white text-2xl">
              நம்பிக்கையின் அடையாளம்
            </h4>
            <hr className="w-full border-1 border-yellow-500" />
            <h4 className="text-center text-white text-sm sm:text-xl  font-bold">
              CLICK HERE TO ENTER FOR MONTHLY PAY
            </h4>
            <div className="flex flex-col md:flex-row justify-between w-full h-100vh my-auto sm:my-0 p-3 rounded-sm  gap-5 sm:gap-3">
              <Link
                to="/Goldform"
                className="bggoldbtn px-8 p-2 font-semibold text-black rounded-md text-center "
              >
                GOLD COIN
              </Link>
              <Link
                to="/Silverform"
                className="bgsilverbtn px-8 p-2 font-semibold text-black rounded-md text-center"
              >
                SILVER
              </Link>
              <Link
                to="/Chitform "
                className="bgchitbtn px-8 p-2 font-semibold text-white rounded-md text-center"
              >
                CHIT FUND
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Hero;
