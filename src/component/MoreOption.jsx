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
    

    <div className="relative inline-block text-left z-30">
      <HiEllipsisVertical
        className="h-7 w-8 text-gray-700 hover:text-black cursor-pointer transition duration-200"
        onClick={toggleMenu}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-10 focus:outline-none">
          <div className="px-5 py-4 space-y-2">
            <p className="text-sm text-gray-700 font-medium border-b pb-2 ml-8">{email}</p>

            <Link
              to="/layout/reset_password"
              onClick={() => setOpen(!isOpen)}
              className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-150"
            >
              🔒 Change Password
            </Link>
          </div>
        </div>
      )}
    </div>

  );
};

export default MoreOption;
