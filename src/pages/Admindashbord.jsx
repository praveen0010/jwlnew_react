import React from "react";
import { useState, useEffect } from "react";
import "./Admindashbord.css";
import axios from "axios";

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

  return (
    <div
      className="
          w-full  
           flex    h-full pt-20 md:pt-32 relative"
    >
      <div className=" w-full mx-auto overflow-auto  border rounded-lg shadow-md relative ">
        {/* Table with Fixed Header */}
        <table className="w-full border-collapse h-full">
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
              <td colSpan="6" className="border p-2 text-left font-semibold">
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
