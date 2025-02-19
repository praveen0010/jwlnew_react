import React from "react";
import "./Hero.css";
import herobg from "../Assets/images/herobg.png";
import Herogirl from "../Assets/images/Herogirl.png";
const Hero = () => {
  return (
    <div
      style={{ backgroundImage: `url(${herobg})` }}
      className=" 
      pt-20 pb-0  
      w-full bg-cover bg-center flex-row flex 
      justify-around gap-3 p-3 flex-wrap "
    >
      <div>
        <img src={Herogirl} className="w-full h-full" alt="heroimg" />
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-white text-5xl font-extrabold">
          சேலம் ஜுவல்லரி
        </h1>
        <h4 className="text-center text-white text-2xl">
          நம்பிக்கையன் அடையாளம்
        </h4>
        <hr className="w-full border-1 border-yellow-500" />
        <h4 className="text-center text-white text-lg md:text-xl font-bold">
          CLICK HERE TO ENTER FOR MONTHLY PAY
        </h4>
        <div className="flex flex-col md:flex-row justify-between w-full p-3 rounded-sm  gap-2">
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
