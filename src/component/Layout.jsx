import React from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/slices/loginSlice";
import Header from "./Header";
import {Outlet } from "react-router-dom";

const Layout = () => {
  const userDetails = useSelector(getUserDetails);
  
  return (
    <div className="flex">
      <Sidebar />
      <div className=" h-screen w-full flex flex-col">
        <Header />
        <main className=" h-[94%] w-full">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
