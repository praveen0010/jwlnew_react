import React from "react";
import "./Navbar.css";
import logo from "../Assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="md:px-10 fixed top-0 left-0 w-full h-18 gradientbg p-3   flex justify-between  items-center">
      <div>
        <img src={logo} alt="logo" className="h-22 w-24  md:w-42 md:h-42" />
      </div>
      <div className="bgvanmobile   rounded-lg p-3 md:px-5">
        <h1 className="md:font-semibold   text-white ">1234567890</h1>
      </div>
    </div>
  );
};

export default Navbar;
