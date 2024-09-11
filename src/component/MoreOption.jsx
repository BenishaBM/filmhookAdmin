import React, { useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { getUserEmail } from "../redux/slices/loginSlice";
import { Link } from "react-router-dom";


const MoreOption = () => {

  const email = useSelector(getUserEmail);
 
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className=" inline-block right-0 bg-transparent rounded z-30">
      <HiEllipsisVertical className="h-7 w-8 text-black" onClick={toggleMenu} />
      {isOpen &&(
        <div className=" origin-top-right absolute right-0 mt-1 w-48 rounded-md px-5 py-3 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="py-1">{email}</div>
            <Link className = "py-1" to ="/layout/reset_password" onClick={()=>{
              setOpen(!isOpen)
            }}>Change Password</Link>

        </div>
      )}
    </div>
  );
};

export default MoreOption;
