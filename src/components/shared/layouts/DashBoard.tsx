


import React from "react";
import Sidebar from "../header/AdminSidebar";
import Navbar from "../header/AdminNavBar";

const DashBoard = ({ children }) => {
  return (
    <>
     <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        {/* Header */}
        <div className="px-4 md:px-10 mx-auto w-full bg-black">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
