import React from "react";
import homecoverimg from "../Assets/images/homecoverimg.jpg";
import logo from "../Assets/images/logo.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" p-2 flex flex-col  h-100vh mx-auto bg-white">
      <div className=" md:h-48 px-2 md:flex-row flex-col flex justify-between items-center ">
        <div className="overflow-hidden flex  items-center flex-shrink-0 h-full w-full sm:w-1/6 ml-0  ">
          <img
            className="h-1/2 w-1/2  md:w-full md:h-full p-2 mx-auto"
            src={logo}
            alt="logo"
          />
        </div>
        <ul className="w-full  sm:flex-row gap-2 p-3  flex flex-col  justify-between items-center ">
          <Link
            className="w-full hover:transition-transform duration-100 hover:bg-black hover:scale-110 bgcol
           hover:text-yellow-500   font-semibold text-center p-7 text-2xl"
            to="/Goldform"
          >
            Gold Coins
          </Link>

          <Link
            className="w-full hover:transition-transform duration-100 hover:bg-black hover:scale-110
           hover:text-yellow-500  bgcol font-semibold text-center p-7 text-2xl"
            to="/Silverform"
          >
            Silver Coins
          </Link>

          <Link
            className="w-full  hover:transition-transform duration-100 hover:bg-black hover:scale-110
            hover:text-yellow-500  bgcol font-semibold text-center p-7 text-2xl"
            to="/Chitform"
          >
            Chit Payment
          </Link>
        </ul>
      </div>
      <div className="overflow-hidden ">
        <img
          className="w-full h-42 sm:h-52 md:h-[465px] md:w-[1000px]  bg-cover bg-center object-cover mx-auto"
          src={homecoverimg}
          alt="CoverImg"
        />
      </div>
      <div className="flex-[1]">
        <h1 className="text-center p-3 text-2xl font-bold text-yellow-500">
          Welcome to Salem Jwellery
        </h1>
      </div>
    </div>
  );
};

export default Home;
