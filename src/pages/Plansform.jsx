import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../Assets/images/logo.jpeg";

const Plansform = () => {
  let { pageform } = useParams();
  const goldplan = ["200g", "500g", "1000g"];
  const silverplan = ["500g", "1000g", "1kg"];
  const chitplan = ["10,00000", "20,00000", "50,00000"];
  const pageheading =
    pageform === "Goldform"
      ? "Gold Plan"
      : pageform === "Silverform"
      ? "Silver Plan"
      : pageform === "Chitform"
      ? "Chit Plan"
      : "Gold Plan";

  const planlist =
    pageform === "Goldform"
      ? goldplan
      : pageform === "Silverform"
      ? silverplan
      : pageform === "Chitform"
      ? chitplan
      : goldplan;

  const [error, seterror] = useState({
    fullname: "",
    email: "",
    mobile: "",
    planAmtorGrm: "",
  });
  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    email: "",
    mobile: "",
    planAmtorGrm: "",
  });
  function menushowfun() {
    let menudiv = document.getElementById("Slideanimi");
    menudiv.classList.add("slide-in");
    menudiv.classList.remove("slide-out");
  }

  function menuhiddenfun() {
    let menudiv = document.getElementById("Slideanimi");
    menudiv.classList.remove("slide-in");
    menudiv.classList.add("slide-out");
  }
  function validate_data(name, value) {
    let error = "";
    switch (name) {
      case "fullname":
        if (value === "") {
          error = "Empty Name...";
        }
        break;
      case "email":
        if (value === "") {
          error = "Empty E-mail Address...";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid E-mail Address...";
        }
        break;
      case "mobile":
        if (value === "") {
          error = "Empty Moblie...";
        } else if (value?.length < 10) {
          error = "Invalid Moblie...";
        } else if ((error = "")) {
          if (!/^[0-9]{10}$/.test(value)) {
            error = "Invalid Moblie...";
          }
        }
        break;

      case "planAmtorGrm":
        if (value === "") {
          error = "Select Plan ...";
        }
        break;
      default:
        break;
    }
    return error;
  }
  function handelsubmit(e) {
    e.preventDefault();
    var aller = "";
    for (let key in formData) {
      const err = validate_data(key, formData[key]);
      aller += err;
      seterror((preverr) => ({
        ...preverr,
        [key]: err,
      }));
    }
    if (aller === "") {
      Saveuser();
    }
  }

  function Saveuser() {
    setFormData({
      fullname: "",
      email: "",
      mobile: "",
      planAmtorGrm: "",
    });
  }
  const handelchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
    const err = validate_data(name, value);
    seterror((preverr) => ({
      ...preverr,
      [name]: err,
    }));
  };
  return (
    <div className=" p-5 flex flex-col  h-screen mx-auto bg-white gap-5 w-full">
      <div className="  flex justify-between items-center  h-40 ">
        <div className="flex-shrink-0  flex justify-center items-center w-1/2 md:w-1/6 h-full">
          <img
            className=" p-3 md:px-6 h-full w-full mx-auto"
            src={logo}
            alt="logo"
          />
        </div>
        <ul className="hidden md:flex  justify-between items-center gap-5 p-3">
          <li className="font-semibold text-black p-2 px-5  hover:transition-transform duration-200 hover:border-b-4 hover:border-yellow-300 ">
            About
          </li>
          <li className="font-semibold text-black p-2  px-5 hover:transition-transform duration-200 hover:border-b-4   hover:border-yellow-300 ">
            Home
          </li>
          <li className="font-semibold text-black p-2  px-5 hover:transition-transform duration-200 hover:border-b-4   hover:border-yellow-300 ">
            Services
          </li>
          <li className="font-semibold text-black p-2  px-5 hover:transition-transform duration-200 hover:border-b-4   hover:border-yellow-300 ">
            Contact
          </li>
        </ul>
        <ul
          id="Slideanimi"
          className=" fixed top-0 right-0 z-9 w-full  bg-white h-screen sm:hidden flex flex-col  items-center gap-5 p-3 -translate-x-full   "
        >
          <li className="font-semibold text-black p-2 px-5  hover:transition-transform duration-200 hover:border-b-4 hover:border-yellow-300 ">
            About
          </li>
          <li className="font-semibold text-black p-2  px-5 hover:transition-transform duration-200 hover:border-b-4   hover:border-yellow-300 ">
            Home
          </li>
          <li className="font-semibold text-black p-2  px-5 hover:transition-transform duration-200 hover:border-b-4   hover:border-yellow-300 ">
            Services
          </li>
          <li className="font-semibold text-black p-2  px-5 hover:transition-transform duration-200 hover:border-b-4   hover:border-yellow-300 ">
            Contact
          </li>
          <div onClick={menuhiddenfun}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </ul>

        <div className="md:hidden" onClick={menushowfun}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
      </div>
      <div
        className="
    flex justify-center items-center
      container 
           mx-auto mt-5 md:mt-0
       "
      >
        <form
          onSubmit={handelsubmit}
          className=" bg-yellow-300 p-4 md:p-10 py-3 rounded-lg w-full sm:w-1/2 lg:w-1/3 "
        >
          <h1 className="text-center pb-5 font-bold sm:text-lg md:text-3xl">
            {pageheading}
          </h1>

          <div className="mb-3 ">
            <label
              htmlFor="fullname"
              className="text-black font-semibold block"
            >
              Full Name <span className="text-red-600 ">*</span>
            </label>
            <input
              autoComplete="off"
              className=" bg-transparent  rounded-sm p-2 w-full  outline-none focus:border-2 focus:border-black focus:rounded-md   border-b-2 border-black  "
              type="text"
              id="fullname"
              name="fullname"
              onChange={handelchange}
              value={formData.fullname}
            />
            {error.fullname && (
              <p className="text-white block text-xs">{error.fullname}</p>
            )}
          </div>

          <div className="mb-3 ">
            <label htmlFor="email" className="text-black font-semibold block">
              E-mail <span className="text-red-600 ">*</span>
            </label>
            <input
              autoComplete="off"
              className=" p-2 w-full bg-transparent outline-none  focus:border-2 focus:border-black focus:rounded-md border-b-2 border-black   rounded-sm "
              type="email"
              id="email"
              name="email"
              onChange={handelchange}
              value={formData.email}
            />
            {error.email && (
              <p className="text-white block text-xs">{error.email}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="mobile" className="text-black font-semibold block">
              Mobile<span style={{ color: "red" }}>*</span>
            </label>
            <input
              autoComplete="off"
              className=" p-2 w-full bg-transparent outline-none focus:border-2 focus:border-black focus:rounded-md border-b-2 border-black   rounded-sm"
              type="tel"
              id="mobile"
              name="mobile"
              maxLength={10}
              minLength={10}
              value={formData.mobile}
              onChange={handelchange}
            />
            {error.mobile && (
              <p className="text-white text-xs">{error.mobile}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="Profession"
              className="text-black font-semibold block"
            >
              Plan
              <span className="text-red-600">*</span>
            </label>
            <select
              autoComplete="off"
              className=" p-2 w-full  outline-none  focus:border-2 focus:border-black 
            focus:rounded-md border-b-2 border-black  bg-transparent  rounded-sm appearance-none"
              name="planAmtorGrm"
              id="planAmtorGrm"
              value={formData.Profession}
              onChange={handelchange}
            >
              <option className="bg-yellow-300 text-black " value="">
                --Select--
              </option>

              {planlist.map((item) => {
                return (
                  <option
                    className="bg-yellow-300 text-black"
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                );
              })}
            </select>

            {error.planAmtorGrm && (
              <p className="text-white text-xs">{error.planAmtorGrm}</p>
            )}
          </div>

          <div className="flex flex-col">
            <button
              className="hover:transition-bg duration-75 ease-in  hover:bg-yellow-500  hover:text-black hover:cursor-pointer mb-3 text-center bg-black p-3  rounded text-white font-bold"
              type="submit"
              onClick={handelsubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Plansform;
