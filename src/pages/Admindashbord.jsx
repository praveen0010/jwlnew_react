import React from "react";
import { useState, useEffect } from "react";
import "./Admindashbord.css";
import axios from "axios";

const Admindashbord = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("https://asa-cagy.onrender.com/client/clients")
      .then((response) => {
        setdata(response.data);
        // if (response.data.length > 0) {
        //   if (response.data.length === 15) {
        //     setdata(response.data);
        //   } else {
        //     while (response.data.length > 15) {
        //       if (response.data.length < 15) {
        //         response.data.push({
        //           _id: "1",
        //           name: "",
        //           amount: "",
        //           email: "",
        //           phone_number: "",
        //           select_type: "",
        //         });
        //       }
        //     }
        //     setdata(response.data);
        //   }
        // } else {
        //   const fetchdata = Array.from({ length: 20 }, (_, i) => ({
        //     _id: "",
        //     name: "",
        //     amount: "",
        //     email: "",
        //     phone_number: "",
        //     select_type: "",
        //   }));
        //   setdata(fetchdata);
        // }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // setTimeout(() => {
    //   const fetchdata = Array.from({ length: 25 }, (_, i) => ({
    //     id: i + 1,
    //     name: `User ${i + 1}`,
    //     email: `user${i + 1}@example.com`,
    //     age: 20 + (i % 10),
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
           flex    h-full pt-24 md:pt-32"
    >
      <div className=" container mx-auto overflow-auto h-full border rounded-lg shadow-md ">
        {/* Table with Fixed Header & Footer */}
        <table className=" w-full border-collapse ">
          {/* Table Header (Fixed) */}
          <thead className="  bggoldbtn text-white sticky top-0  ">
            <tr>
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Type</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable Table Body with Min Height */}
        <div className="overflow-auto  md:min-h-[500px] min-h-[200px]">
          <table className="w-full border-collapse">
            <tbody>
              {data.length > 0 ? (
                data.map((user, index) => (
                  <tr className="even:bg-gray-200">
                    <td className="p-3  text-left">{index + 1}</td>
                    <td className="p-3 pr-5 text-left">{user.name}</td>
                    <td className="p-3 text-left">{user.phone_number}</td>
                    <td className="p-3 text-left">{user.email}</td>
                    <td className="p-3 text-left">{user.amount}</td>
                    <td className="p-3 text-left">{user.select_type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="border p-4 text-center text-gray-500 h-[200px]"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer (Fixed) */}
        <table className="w-full border-collapse">
          <tfoot className="bggoldbtn sticky bottom-0">
            <tr>
              <td colSpan="3" className="border p-2 text-center font-semibold">
                Total Users: {data.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    // </div>
  );
};

export default Admindashbord;
