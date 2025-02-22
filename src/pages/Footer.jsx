import React from "react";
import twitter from "../Assets/images/twitter.png";
import insta from "../Assets/images/insta.png";
import facebook from "../Assets/images/facebook.png";

const Footer = () => {
  return (
    <footer
      className=" flex-col 
    justify-between bg-white w-full "
    >
      <div className="flex flex-col   w-full  h-full lg:h-44 md:px-5">
        <div className=" p-5 flex-col sm:gap-2 md:gap-5 gap-2 md:flex-row flex w-full justify-between  ">
          <div className="  flex flex-col   rounded-lg  border-4 border-yellow-600 hover:transition-transform duration-100  hover:scale-105 w-full  md:w-1/3  break-words p-4">
            <h1 className="font-bold ">Address</h1>
            <p> Shop No 36,Muthurangam St,</p>
            <p>Erode,Tamil Nadu-638001</p>
          </div>
          <div className="  flex flex-col   rounded-lg  border-4 border-yellow-600 hover:transition-transform duration-100  hover:scale-105 w-full md:w-1/3  break-words p-4">
            <h1 className="font-bold ">Phone</h1>
            <p>+91 98652 08989</p>
          </div>
          <div className="  flex flex-col   rounded-lg  border-4 border-yellow-600 hover:transition-transform duration-100  hover:scale-105 w-full md:w-1/3 break-words p-4">
            <h1 className="font-bold ">Email</h1>
            <p>salemjewellery1996@gmail.com</p>
          </div>
        </div>
        <div>
          <div>
            <p className="font-semibold text-gray-700 text-sm md:text-lg text-center">
              © Copy Rights to Salem Jewellery
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-600 p-2 flex-col md:flex-row flex  justify-between  items-center">
        <div className="text-white text-center md:text-left  md:w-1/3 w-full ">
          <p>All Rights Reserved</p>
        </div>
        <div
          className="flex justify-center md:justify-end items-center
        w-full   h-12 "
        >
          <h1 className="text-white text-sm md:text-lg font-bold ">Social :</h1>
          <img
            className="h-7 w-7 md:h-12 md:w-12"
            src={insta}
            alt="Instagram"
          />
          <img
            className="h-8 w-8 md:h-14 md:w-14"
            src={facebook}
            alt="twitter"
          />
          <img
            className="h-6 w-6 md:h-10 md:w-10"
            src={twitter}
            alt="twitter"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
