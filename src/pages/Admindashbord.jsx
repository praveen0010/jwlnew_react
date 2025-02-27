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
  return (
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
        <div className="flex  gap-2">
          <button
            onClick={handeldownload}
            className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] 
           flex  gap-3 px-10 py-2 text-white 
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
           hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] flex  gap-3 px-10 py-2 text-white
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
                    <td className="p-3 text-left">{user.paymentStatus}</td>
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
    </div>
  );
};

export default Admindashbord;
