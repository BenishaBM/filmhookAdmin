// import React from "react";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserDetails } from "../redux/slices/loginSlice";
// import Header from "./Header";
// import {Outlet } from "react-router-dom";

// const Layout = () => {
//   const userDetails = useSelector(getUserDetails);
  
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className=" h-screen w-full flex flex-col">
//         <Header />
//         <main className=" h-[94%] w-full">
//           <Outlet/>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;










import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/slices/loginSlice";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const userDetails = useSelector(getUserDetails);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        className="md:hidden fixed z-50 bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar: Hidden on mobile by default, shown when toggled */}
      <div 
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 fixed md:relative z-40 h-full`}
      >
        <Sidebar />
      </div>
      
      {/* Overlay to close sidebar when clicking outside on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;