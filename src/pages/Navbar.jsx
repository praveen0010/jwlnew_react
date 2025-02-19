import React from "react";
import "./Navbar.css";
import logo from "../Assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="md:px-10  h-18 gradientbg p-3 fixed top-0 left-0  w-full mx-auto  flex justify-between  items-center ">
      <div>
        <img src={logo} alt="logo" className="h-22 w-24  md:w-42 md:h-42" />
      </div>
      <div className="flex justify-center items-center gap-1 md:gap-2 bgvanmobile   rounded-lg p-2  md:px-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="size-4 md:size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>

        <h1 className="md:font-semibold  text-xs text-white ">
          +91 9865208989
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
