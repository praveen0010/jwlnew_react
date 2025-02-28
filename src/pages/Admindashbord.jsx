import React from "react";
import { useState, useEffect } from "react";
import "./Admindashbord.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const Admindashbord = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [search, setsearch] = useState("");
  const [isloading, setisloading] = useState(true);
  const [page, setpage] = useState(1);
  const [isreport, setisreport] = useState(false);
  const [savemsg, setsavemsg] = useState("");
  const [pricedata, setpricedata] = useState({
    goldprice: "",
    silverprice: "",
    chitprice: "",
  });
  const [priceerror, setpriceerror] = useState({
    goldprice: "",
    silverprice: "",
    chitprice: "",
  });

  useEffect(() => {
    setisloading(true);
    axios
      //.get("https://asa-h5hb.onrender.com/client/clients")
      .get(
        //`https://asa-main.onrender.com/client/clientsort?page=${page}&limit=10&sortBy=name&sortOrder=asc`
        `${process.env.REACT_APP_BASE_URL}/client/clientsort?page=${page}&limit=10&sortBy=name&sortOrder=asc`
      )
      .then((response) => {
        setdata(response.data);
        setisloading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setisloading(false);
        console.error("Error fetching data:", error);
      });

    // setTimeout(() => {
    //   setisloading(true);
    //   const fetchdata = Array.from({ length: 10 }, (_, i) => ({
    //     amount: i + 1,
    //     name: `User ${i + 1}`,
    //     email: `user${i + 1}@example.com`,
    //     phone_number: 1234567890,
    //     select_type: "Gold",
    //   }));
    //   setisloading(false);
    //   setdata(fetchdata);
    // }, 2000);
    return () => {
      setdata([]);
    };
  }, [page]);

  function handeldownload() {
    if (data.length > 0) {
      const fname = getUniqueFilename();
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(removeFirstAndLastFromList(data));
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, fname);
    }
  }
  const removeFirstAndLastFromList = (arr) => {
    return arr.map((obj) => {
      const entries = Object.entries(obj); // Convert object to array
      if (entries.length <= 2) return {}; // If only 1 or 2 keys, return empty object

      const filteredEntries = entries.slice(1, -1); // Remove first and last key
      return Object.fromEntries(filteredEntries); // Convert back to object
    });
  };

  const getUniqueFilename = () => {
    const now = new Date();

    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };

    // Format the date-time string
    const formattedDateTime = new Intl.DateTimeFormat("en-GB", options)
      .format(now)
      .replace(/\//g, "") // Remove slashes from date
      .replace(/, /g, "_") // Replace comma with underscore
      .replace(/:/g, ""); // Remove colons from time

    return `Customerlist_${formattedDateTime}.xlsx`;
  };
  function handelchangesearch(e) {
    setsearch(e.target.value);
  }
  function submitprice(e) {
    e.preventDefault();
    var aller = "";
    for (let key in pricedata) {
      const err = isValidNumber(
        key.split("price")[0].toLocaleUpperCase(),
        pricedata[key]
      );
      aller += err;
      setpriceerror((preverr) => ({
        ...preverr,
        [key]: err,
      }));
    }
    if (aller === "") {
      Saveprice();
    }
  }
  async function Saveprice() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/client/client`,
        JSON.stringify(pricedata),
        {
          headers: {
            "Content-Type": "application/json", // Send data as raw JSON
          },
        }
      );
      if (response.status === 200) {
        setsavemsg("Price Change Succefull");
      } else {
        setsavemsg("Price Change Not Chnage");
      }
    } catch (error) {
      setsavemsg(error.message);
    }
  }
  function handelpricechange(e) {
    const { name, value, id } = e.target;
    console.log(name, value);
    setpricedata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
    const err = isValidNumber(id, value);
    setpriceerror((preverr) => ({
      ...preverr,
      [name]: err,
    }));
  }
  function isValidNumber(type, strvalue) {
    if (!isNaN(strvalue) && !isNaN(parseFloat(strvalue))) {
      return "";
    } else {
      return `Invalid ${type.toLocaleUpperCase()} Price`;
    }
  }
  function showprice() {
    setisreport(!isreport);
  }
  return (
    <>
      <div
        className="
          w-full  
           flex    h-full pt-20 md:pt-32 relative  flex-col"
      >
        <div className="flex-col md:flex-row flex justify-center md:justify-between gap-3 w-full  my-1 px-1 ">
          <div className="flex w-full  md:w-1/2">
            <input
              onChange={handelchangesearch}
              type="text"
              placeholder="Search Here..."
              className="  w-full p-2   border-2 border-green-600 outline-none   rounded-md  placeholder-green-600"
            />
          </div>
          <div className="flex justify-between  gap-1 md:gap-2  ">
            <button
              onClick={showprice}
              className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3 px-5 md:px-10 py-2 text-white 
            font-bold rounded w-full md:w-auto justify-center"
            >
              <p className="hidden md:block">Report</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </button>

            <button
              onClick={showprice}
              className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3 px-5 md:px-10 py-2 text-white 
            font-bold rounded w-full md:w-auto justify-center"
            >
              <p className="hidden md:block">Set Price</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button
              onClick={handeldownload}
              className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3 px-5 md:px-10 py-2 text-white 
            font-bold rounded w-full md:w-auto justify-center"
            >
              <p className="hidden md:block">Excel</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>
            <button
              onClick={() => navigate("/")}
              className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r 
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  md:gap-3 px-5 md:px-10 py-2 text-white
            font-bold rounded w-full md:w-auto justify-center"
              title="Exit"
            >
              <p className="hidden md:block">Logout</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                />
              </svg>
            </button>
          </div>
        </div>
        {!isreport ? (
          <>
            <div className=" w-full mx-auto overflow-auto  border rounded-md  h-full relative ">
              {/* Table with Fixed Header */}
              <table className="w-full border-collapse  ">
                <thead className="p-2 bggoldbtn text-white sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">No</th>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Mobile</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">schemes</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>

                {/* Scrollable Table Body with Min Height */}
                <tbody className=" overflow-auto ">
                  {data.length > 0 ? (
                    data
                      .filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((user, index) => (
                        <tr key={index} className={`even:bg-gray-200`}>
                          <td className="p-3 text-left">{index + 1}</td>
                          <td className="p-3 text-left">{user.name}</td>
                          <td className="p-3 text-left">{user.phone_number}</td>
                          <td className="p-3 text-left">{user.email}</td>
                          <td className="p-3 text-left">{user.select_type}</td>
                          <td className="p-3 text-left">{user.schemes}</td>
                          <td className="p-3 text-left">{user.amount}</td>
                          <td className="p-3 text-left">
                            {user.paymentStatus}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="border p-4 text-center text-gray-500 h-[470px]"
                      >
                        {isloading ? (
                          <p className="font-semibold text-xl animate-pulse ease-in delay-0 text-green-600">
                            Loading...
                          </p>
                        ) : (
                          <p className="font-semibold text-xl animate-pulse ease-in delay-0 text-green-600">
                            No data available
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* Table Footer (Fixed) */}
              </table>
            </div>

            <table>
              <tfoot className="bggoldbtn   bottom-0 w-full  flex  items-center justify-center">
                <tr className="mx-auto">
                  <td
                    colSpan="7"
                    className="   pt-2 pb-2 px-3   text-left font-semibold left-10"
                  >
                    <div className="flex  items-center justify-center">
                      <button
                        onClick={() => setpage(1)}
                        className="bg-white px-4 mr-1 rounded cursor-pointer"
                      >
                        <p>Start</p>
                      </button>
                      <button
                        onClick={() => setpage(page - 1)}
                        disabled={page === 1}
                        className="bg-white px-4 mr-1 rounded cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                          />
                        </svg>
                      </button>

                      <button className="bg-white px-4 mr-1 rounded ">
                        <p>{page ? page : "  "}</p>
                      </button>
                      <button
                        onClick={() => setpage(page + 1)}
                        disabled={data.length === 0}
                        className="bg-white px-4 mr-1 rounded cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <div
            className="
 w-full mx-auto overflow-auto  border rounded-md  h-full relative  flex items-center justify-center"
          >
            <form className="flex flex-col  w-full md:w-1/3  items-center p-3   rounded-md shadow-md shadow-gray-700">
              <div className="p-3  flex  flex-col w-full ">
                <label htmlFor="goldprice" className="font-semibold mb-2">
                  Gold Price
                </label>
                <input
                  className="p-2   rounded-md border-2 border-green-500 outline-none "
                  type="text"
                  onChange={handelpricechange}
                  value={pricedata.goldprice}
                  name="goldprice"
                  id="Gold"
                />

                <p className="text-sm text-red-600 ">{priceerror.goldprice}</p>
              </div>
              <div className="p-2  flex  flex-col w-full ">
                <label htmlFor="goldprice" className="font-semibold mb-2">
                  Sliver Price
                </label>
                <input
                  type="text"
                  value={pricedata.silverprice}
                  onChange={handelpricechange}
                  name="silverprice"
                  id="Silver"
                  className="p-2   rounded-md border-2 border-green-500 outline-none "
                />
                <p className="text-sm text-red-600 ">
                  {priceerror.silverprice}
                </p>
              </div>
              <div className="p-3  flex  flex-col w-full ">
                <label htmlFor="goldprice" className="font-semibold mb-2">
                  Chit Amount
                </label>
                <input
                  value={pricedata.chitprice}
                  type="text"
                  onChange={handelpricechange}
                  name="chitprice"
                  id="Chit"
                  className="p-2   rounded-md border-2 border-green-500 outline-none "
                />

                <p className="text-sm text-red-600 ">{priceerror.chitprice}</p>
              </div>
              {savemsg && <p className="text-sm text-red-600 ">{savemsg}</p>}
              <div className="p-3  flex gap-3 flex-col w-full ">
                <button
                  onClick={submitprice}
                  className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200]  p-3 rounded-md"
                >
                  <span className="font-bold text-lg text-white">Save</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Admindashbord;
