import React from "react";
import { useState, useEffect } from "react";
import "./Admindashbord.css";
import axios from "axios";

import * as XLSX from "xlsx";
const Admindashbord = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("https://asa-h5hb.onrender.com/client/clients")
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // setTimeout(() => {
    //   const fetchdata = Array.from({ length: 25 }, (_, i) => ({
    //     amount: i + 1,
    //     name: `User ${i + 1}`,
    //     email: `user${i + 1}@example.com`,
    //     phone_number: 1234567890,
    //     select_type: "Gold",
    //   }));
    //   setdata(fetchdata);
    // }, 2000);
    return () => {
      setdata([]);
    };
  }, []);
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

    return `Cutomerlist_${formattedDateTime}.xlsx`;
  };

  return (
    <div
      className="
          w-full  
           flex    h-full pt-20 md:pt-32 relative  flex-col"
    >
      <div className="flex  justify-end w-full p-1 ">
        <button
          onClick={handeldownload}
          className=" bg-gradient-to-r from-[#006537] via-[#01a056] to-[#006e39] hover:bg-gradient-to-r hover:from-[#b28800] hover:via-[#d9a500] hover:to-[#ab8200] flex  gap-3 px-10 py-2 text-white font-bold rounded "
          // style={{
          //   background:
          //     "linear-gradient(90deg, #006537 0%, #01a056 50.5%, #006e39 100%)",
          // }}
        >
          Excel
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
      </div>

      <div className=" w-full mx-auto overflow-auto  border rounded-lg shadow-md relative">
        {/* Table with Fixed Header */}
        <table className="w-full border-collapse h-screen">
          <thead className="bggoldbtn text-white sticky top-0">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Type</th>
            </tr>
          </thead>

          {/* Scrollable Table Body with Min Height */}
          <tbody className=" overflow-auto ">
            {data.length > 0 ? (
              data.map((user, index) => (
                <tr key={index} className="even:bg-gray-200">
                  <td className="p-3 text-left">{index + 1}</td>
                  <td className="p-3 text-left">{user.name}</td>
                  <td className="p-3 text-left">{user.phone_number}</td>
                  <td className="p-3 text-left">{user.email}</td>
                  <td className="p-3 text-left">{user.amount}</td>
                  <td className="p-3 text-left">{user.select_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border p-4 text-center text-gray-500 h-[200px]"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>

          {/* Table Footer (Fixed) */}

          <tfoot className="bggoldbtn sticky bottom-0">
            <tr>
              <td colSpan="6" className="border  p-2 text-left font-semibold">
                Total Users: {data.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Admindashbord;
