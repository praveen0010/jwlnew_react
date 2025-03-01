import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import herobg from "../Assets/images/herobg.png";
import "./Planform.css";
import axios from "axios";

const Plansform = ({ planlist, pageheading, btnclass }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [paymentstatus, setpaymentstatus] = useState("");

  const [saveres, setsaveres] = useState("");
  const [pricedet, setpricedet] = useState({
    golden: "",
    silver: "",
    chittu: "",
  });

  const [error, seterror] = useState({
    _id: "",
    name: "",
    amount: "",
    email: "",
    phone_number: "",
    select_type: "",
    schemes: "",
    paymentId: "",
    paymentStatus: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    email: "",
    phone_number: "",
    select_type: pageheading,
    schemes: "",
    paymentId: "",
    paymentStatus: "",
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/prices/getPrices`)
      .then((response) => {
        
        const price = {
          chittu: response?.data?.[0]?.chittu,
          golden: response?.data?.[0]?.golden,
          silver: response?.data?.[0]?.silver,
        };
        setpricedet(price);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return () => {
      setpricedet({});
    };
  }, []);
  const toggleAlert = () => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

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
      if (formData.select_type === "Gold Plan") {
        const gram = formData.schemes.split("g");
        formData.amount = gram?.[0] * parseFloat(pricedet?.golden);
      } else if (formData.select_type === "Silver Plan") {
        const gram = formData.schemes.split("g");
        formData.amount = gram?.[0] * parseFloat(pricedet?.silver);
      } else if (formData.select_type === "Chit Plan") {
        const gram = formData.schemes.split("0,0");
        formData.amount = gram?.[0] * parseFloat(pricedet?.chittu);
      }
      if (!formData.amount) {
        saveres("Invalid Amount");
        return;
      }

      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with your Razorpay Key ID
        key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY, // Replace with your Razorpay Key ID
        amount: parseFloat(formData.amount) * 100, // Amount in paisa (50000 = 500 INR)
        currency: "INR",
        name: "Salem Jewellery",
        description: "Test Transaction",
        //image: "https://your-logo-url.com/logo.png", // Optional
        //order_id: "1", // Replace with your order ID
        handler: async function (response) {
          const razorpay_payment_id = response.razorpay_payment_id;
          if (razorpay_payment_id) {
            setIsVisible(true);
            const paymentDetails = await verifyPayment(razorpay_payment_id);
            
            if (paymentDetails) {
              savetodb(razorpay_payment_id, paymentDetails);
            }
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone_number,
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      setIsVisible(false);
      console.error("Error submitting form:", error);
    }
  }

  const verifyPayment = async (razorpay_payment_id) => {
    try {
      setIsVisible(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/payment/getPaymentDetails`,
        {
          razorpay_payment_id: razorpay_payment_id,
        }
      );
      if (response?.data?.payment?.status) {
        return response?.data?.payment?.status;
      }
    } catch (error) {
      setIsVisible(false);
      console.error("Payment verification error:", error);
    }
  };
  const savetodb = async (paymentid, paymentstatus) => {
    try {
      setIsVisible(true);
      formData.paymentId = paymentid;
      formData.paymentStatus = paymentstatus;

      const response = await axios.post(
        //"https://asa-main.onrender.com/client/client",
        `${process.env.REACT_APP_BASE_URL}/client/client`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json", // Send data as raw JSON
          },
        }
      );

      if (response.status === 200) {
        setpaymentstatus("Payment Succefull");
      } else {
        setpaymentstatus("Payment Failed");
      }
    } catch (error) {
      setIsVisible(false);
      setsaveres(error.message);
    }
  };
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
    <>
      {isVisible && (
        <div className="alert-overlay z-20">
          {paymentstatus !== "" ? (
            <div className="alert-box flex  items-center justify-center flex-col gap-10">
              <h2 className="font-semibold text-xl text-black">
                {paymentstatus}
              </h2>
              <button
                className="bg-green-500  text-white px-6 py-2 rounded-md font-semibold"
                onClick={toggleAlert}
              >
                Close
              </button>
            </div>
          ) : (
            <div className=" w-12 h-12 md:w-36 md:h-36  border-8 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          )}
        </div>
      )}
      <div
        className="
          w-full  
            flex  flex-col items-center justify-center
             h-full   pt-16 sm:pt-22 md:pt-28"
      >
        <div
          style={{ backgroundImage: `url(${herobg})` }}
          className=" bg-center md:bg-cover bg-contain 
              w-full py-auto h-screen
              px-2  py-10 flex  flex-col items-center justify-center
             "
        >
          <form
            onSubmit={handelsubmit}
            className=" shadow-md shadow-black bg-gray-200  p-10 rounded-lg  w-full md:w-[30%] "
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
              <label
                htmlFor="mobile"
                className="text-black font-semibold block"
              >
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
                name="schemes"
                id="schemes"
                value={formData.schemes}
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

              {error.schemes && (
                <p className="text-red-600 text-xs">{error.schemes}</p>
              )}
            </div>

            <p className="text-center text-red-600">{saveres}</p>
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
    </>
  );
};

export default Plansform;
