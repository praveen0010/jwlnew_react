import React, { useState } from "react";
import herobg from "../Assets/images/herobg.png";
import "./Planform.css";
import { Link } from "react-router-dom";

const Adminform = ({ onlogin, loginerr, isloading }) => {
  const [error, seterror] = useState({
    name: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  function validate_data(name, value) {
    let error = "";
    switch (name) {
      case "name":
        if (value === "") {
          error = "Empty Name...";
        }
        break;
      case "password":
        if (value === "") {
          error = "Empty Password...";
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
      checkadmin();
    }
  }

  function checkadmin() {
    onlogin(formData.name, formData.password);
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
    <div
      className="
       w-full  
                flex  flex-col items-center justify-center
                 h-full   pt-16 sm:pt-22 md:pt-28"
    >
      <div
        style={{ backgroundImage: `url(${herobg})` }}
        className=" 
         bg-center md:bg-cover bg-contain 
              w-full py-auto h-screen
              px-2  py-10 flex  flex-col items-center justify-center
              "
      >
        {isloading ? (
          <div class="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
            <div class="w-12 h-12 md:w-36 md:h-36  border-8 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          // <div className=" flex justify-center items-center shadow-md shadow-black   p-10 rounded-lg  w-full md:w-[30%] h-1/2">
          //   <p className=" text-center text-green-600 text-2xl animate-pulse transition-transform delay-75 ">
          //     Loading...
          //   </p>
          // </div>
          <form
            onSubmit={handelsubmit}
            className=" shadow-md shadow-black bg-gray-200  p-10 rounded-lg  w-full md:w-[30%] "
          >
            <h1 className="text-center pb-5 font-bold sm:text-lg md:text-3xl">
              Login
            </h1>

            <div className="mb-3 ">
              <label
                htmlFor="fullname"
                className="text-black font-semibold block"
              >
                Email
              </label>
              <input
                autoComplete="off"
                className=" bg-transparent  rounded-sm p-2 w-full  outline-none focus:border-2 focus:border-black focus:rounded-md   border-b-2 border-black  "
                type="text"
                id="name"
                name="name"
                onChange={handelchange}
                value={formData.name}
              />
              {error.name && (
                <p className="text-red-600 block text-xs">{error.name}</p>
              )}
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="password"
                className="text-black font-semibold block"
              >
                Password
              </label>
              <input
                autoComplete="off"
                className=" p-2 w-full bg-transparent outline-none  focus:border-2 focus:border-black focus:rounded-md border-b-2 border-black   rounded-sm "
                type="password"
                id="password"
                name="password"
                onChange={handelchange}
                value={formData.password}
              />
              {error.password && (
                <p className="text-red-600 text-xs">{error.password}</p>
              )}
            </div>
            {loginerr && (
              <p className="text-red-600 text-xs text-center p-3">{loginerr}</p>
            )}

            <div className="flex flex-col">
              <button
                className={`cursor-pointer 
             mb-3 text-center  p-3  rounded text-white font-bold`}
                type="submit"
                onClick={handelsubmit}
                style={{
                  background:
                    "linear-gradient(90deg, #006537 0%, #01a056 50.5%, #006e39 100%)",
                }}
              >
                Login
              </button>
            </div>

            <Link to={"/Resetpassword"}>
              <p className="cursor-pointer text-right text-blue-700">
                Reset Password
              </p>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default Adminform;
