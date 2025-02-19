import React from "react";
import "./Hero.css";
import herobg from "../Assets/images/herobg.png";
import Herogirl from "../Assets/images/Herogirl.png";
const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${herobg})` }}
      className=" 
      pt-12 md:pt-20 mt-12 pb-0  
      w-full  bg-center md:bg-cover bg-contain md:flex-row flex justify-around
       gap-3 p-3 flex-col    "
    >
      <div className="order-2 md:order-1">
        <img src={Herogirl} className="w-full md:h-full h-136" alt="heroimg" />
      </div>
      <div className="order-1 md:order-2 flex flex-col justify-center items-center gap-7  py-7 md:gap-5">
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
          <button className="bggoldbtn px-7 p-2 font-semibold text-white rounded-md">
            GOLD COIN
          </button>
          <button className="bgsilverbtn px-7 p-2 font-semibold text-black rounded-md">
            SILVER
          </button>
          <button className="bgchitbtn px-7 p-2 font-semibold text-white rounded-md">
            CHIT FUND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
