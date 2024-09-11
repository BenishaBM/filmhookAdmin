import React from "react";
import { useSelector } from "react-redux";
import {getUsername} from "../redux/slices/loginSlice";
import { FaUserCircle } from "react-icons/fa";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import MoreOption from "./MoreOption";

const Header = () => {
  const username = useSelector(getUsername);
  

  return (
    <div className=" h-[6%] w-full shadow-md flex items-center justify-end px-10  ">
      <div className="flex items-center justify-end w-[20%] ">
        <p className="flex mr-3">
          <span className=" text-2xl mr-2">
            <FaUserCircle className=" " />
          </span>
          {username}
        </p>
        <MoreOption />
      </div>
    </div>
  );
};

export default Header;
