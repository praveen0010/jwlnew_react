import React, { useState } from "react";
import { useParams } from "react-router-dom";
import herobg from "../Assets/images/herobg.png";
import "./Planform.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Plansform = () => {
  const navigate = useNavigate();
  let { pageform } = useParams();
  const goldplan = ["1gm", "2gms", "4gms", "8gms"];
  const silverplan = ["1gm", "2gms", "5gms", "10gms"];
  const chitplan = ["10,00000", "20,00000", "50,00000"];

  const btnclass =
    pageform === "Goldform"
      ? "proceedtopaybtngold"
      : pageform === "Silverform"
      ? "proceedtopaybtnsilver"
      : pageform === "Chitform"
      ? "proceedtopaybtnchit"
      : "proceedtopaybtngold";

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
    _id: "",
    name: "",
    amount: "",
    email: "",
    phone_number: "",
    select_type: "",
    Scheme: "",
  });
  const [formData, setFormData] = useState({
    // "name": "test3",
    // "email": "test3@gmail.com",
    // "amount": "30000",
    // "phone_number": "1234567891",
    // "select_type": "Sliver"
    name: "",
    amount: 1000,
    email: "",
    phone_number: "",
    select_type: pageheading,
    Scheme: "",
  });

  // {
  //   "_id": "67b6ebd47e3641f2b738c7e6",
  //   "name": "test1",
  //   "amount": "20000",
  //   "email": "test1@gmail.com",
  //   "phone_number": "1234567891",
  //   "select_type": "Sliver",
  // }

  function validate_data(name, value) {
    let error = "";
    switch (name) {
      case "name":
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
      case "phone_number":
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

      case "Scheme":
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

  async function Saveuser() {
    try {
      const response = await axios.post(
        "https://asa-h5hb.onrender.com/client/client",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json", // Send data as raw JSON
          },
        }
      );
      // Clear form after submission (optional)
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        amount: 1000,
        email: "",
        phone_number: "",
        select_type: "",
        Scheme: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }

    // var options = {
    //   key: "EoxDcX6v1tuM31", // Replace with your Razorpay Key ID
    //   key_secret: "rzp_test_LbSBa4hZOPOEzk",
    //   amount: 50000, // Amount in paisa (50000 = 500 INR)
    //   currency: "INR",
    //   name: "Salem Jewellery",
    //   description: "Test Transaction",
    //   //image: "https://your-logo-url.com/logo.png", // Optional
    //   //order_id: "ORDER_ID_FROM_BACKEND", // Replace with your order ID
    //   handler: function (response) {
    //     alert(
    //       "Payment Successful! Payment ID: " + response.razorpay_payment_id
    //     );
    //     setFormData({
    //       fullname: "",
    //       email: "",
    //       mobile: "",
    //       planAmtorGrm: "",
    //     });
    //   },
    //   prefill: {
    //     name: "Praveen",
    //     email: "praveen@example.com",
    //     contact: "9999999999",
    //   },
    //   notes: {
    //     address: "Test Address",
    //   },
    //   theme: {
    //     color: "#3399cc",
    //   },
    // };

    // var rzp1 = new window.Razorpay(options);
    // rzp1.open();
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
          md:px-2  p-10 flex  flex-col items-center justify-center"
      >
        <form
          onSubmit={handelsubmit}
          className=" shadow-md shadow-black bg-gray-200 p-4 md:p-10 py-3 rounded-lg w-full  md:w-1/2 lg:w-1/3 "
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
              <p className="text-red-600 text-xs">{error.email}</p>
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
              id="phone_number"
              name="phone_number"
              maxLength={10}
              minLength={10}
              value={formData.phone_number}
              onChange={handelchange}
            />
            {error.phone_number && (
              <p className="text-red-600 text-xs">{error.phone_number}</p>
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
            {/* <div>
            <CustomDropdown
              options={planlist}
              selected={formData.planAmtorGrm}
              onSelect={handelchange}
            />
          </div> */}
            <select
              autoComplete="off"
              className=" p-2 w-full  outline-none  focus:border-2 focus:border-black 
            focus:rounded-md border-b-2 border-black  bg-transparent  rounded-sm appearance-none
            accent-yellow-400"
              name="Scheme"
              id="Scheme"
              value={formData.Scheme}
              onChange={handelchange}
            >
              <option value="">--Select--</option>

              {planlist.map((item) => {
                return (
                  <option className="" key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>

            {error.Scheme && (
              <p className="text-red-600 text-xs">{error.Scheme}</p>
            )}
          </div>
          <div className="flex flex-col">
            <button
              className={`${btnclass}      cursor-pointer
             mb-3 text-center  p-3  rounded text-white font-bold`}
              type="submit"
              onClick={handelsubmit}
            >
              Proceed to Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Plansform;
