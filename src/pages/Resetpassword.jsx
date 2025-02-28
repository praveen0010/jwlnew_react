import { useState } from "react";
import { useNavigate } from "react-router-dom";
import herobg from "../Assets/images/herobg.png";
import axios from "axios";

const Resetpassword = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const erremail = validatePassword(email);
      const errpass = validatePassword(password);
      let err = erremail + errpass;
      if (err) {
        const response = await axios.post(
          "https://asa-main.onrender.com/admin/restpassword",
          JSON.stringify({ email, password }),
          {
            headers: {
              "Content-Type": "application/json", // Send data as raw JSON
            },
          }
        );

        setMessage(response?.data?.message);
        console.log(response);
        if (response.status === 200) {
          setTimeout(() => navigate("/Admin"), 2000); // Redirect to login after 2s
        }
      } else {
        setMessage("Invalid Password...");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };
  const handelchangepass = (e) => {
    setPassword(e.target.value);
    const err = validatePassword(password, "pass");
    if (err) {
      setMessage("");
    } else {
      setMessage("Invalid Password");
    }
  };

  const handelchangeemail = (e) => {
    setemail(e.target.value);
    const err = validatePassword(email, "email");
    if (err) {
      setMessage("");
    } else {
      setMessage("Invalid Email");
    }
  };
  const validatePassword = (value, type) => {
    if (type === "pass") {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(value);
    } else {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(value);
    }
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
          onSubmit={handleSubmit}
          className=" shadow-md shadow-black bg-gray-200 p-5  rounded-lg md:w-1/4 w-full "
        >
          <h2 className="text-center pb-5 text-black font-semibold">
            Reset Password
          </h2>
          <div className="mb-3 ">
            <label htmlFor="NewPass" className=" block">
              Email
            </label>
            <input
              autoComplete="off"
              className=" bg-transparent  rounded-sm p-2 w-full  outline-none 
              focus:border-2 focus:border-black focus:rounded-md   
              border-b-2 border-black  "
              type="email"
              id="email"
              name="email"
              onChange={handelchangeemail}
              value={email}
            />
          </div>

          <div className="mb-3 ">
            <label htmlFor="NewPass" className=" block">
              New Password
            </label>
            <input
              autoComplete="off"
              className=" bg-transparent  rounded-sm p-2 w-full  outline-none focus:border-2 focus:border-black focus:rounded-md   border-b-2 border-black  "
              type="text"
              id="NewPass"
              name="NewPass"
              onChange={handelchangepass}
              value={password}
            />
          </div>

          <div className="flex flex-col">
            <button
              className="cursor-pointer
             mb-3 text-center  p-3  rounded text-white  font-bold"
              style={{
                background:
                  "linear-gradient(90deg, #006537 0%, #01a056 50.5%, #006e39 100%)",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              Reset
            </button>
          </div>

          {message ? (
            <p className="text-red-600 text-center animate-pulse delay-75">
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default Resetpassword;
