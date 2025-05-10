// import React from "react";
// import { useSelector } from "react-redux";
// import {getUsername} from "../redux/slices/loginSlice";
// import { FaUserCircle } from "react-icons/fa";
// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Button,
// } from "@material-tailwind/react";
// import { PiDotsThreeVerticalBold } from "react-icons/pi";
// import MoreOption from "./MoreOption";

// const Header = () => {
//   const username = useSelector(getUsername);
  

//   return (
//     <div className=" h-[6%] w-full shadow-md flex items-center justify-end px-10  ">
//       <div className="flex items-center justify-end w-[20%] ">
//         <p className="flex mr-3">
//           <span className=" text-2xl mr-2">
//             <FaUserCircle className=" " />
//           </span>
//           {username}
//         </p>
//         <MoreOption />
//       </div>
//     </div>
//   );
// };

// export default Header;



















// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getUsername } from "../redux/slices/loginSlice";
// import { FaUserCircle } from "react-icons/fa";
// import { IoMdNotifications } from "react-icons/io";
// import MoreOption from "./MoreOption";

// const Header = () => {
//   const username = useSelector(getUsername);
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     const fetchNotificationCount = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//         if (!token) return;

//         const response = await fetch(
//           "https://www.filmhooks.annulartech.net/admin/getTotalNotificationCount",
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await response.json();
//         if (data.status === 1) {
//           setNotificationCount(data.data.totalNotificationCount);
//         }
//       } catch (error) {
//         console.error("Error fetching notification count:", error);
//       }
//     };

//     fetchNotificationCount();
    
//     // Set up interval to fetch notifications periodically
//     const intervalId = setInterval(fetchNotificationCount, 60000); // every minute
    
//     // Clean up on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div className="h-[6%] w-full shadow-md flex items-center justify-end px-10">
//       <div className="flex items-center justify-end w-[20%]">
//         <div className="relative mr-4 cursor-pointer">
//           <IoMdNotifications className="text-2xl" />
//           {notificationCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               {notificationCount > 99 ? "99+" : notificationCount}
//             </span>
//           )}
//         </div>
//         <p className="flex mr-3">
//           <span className="text-2xl mr-2">
//             <FaUserCircle />
//           </span>
//           {username}
//         </p>
//         <MoreOption />
//       </div>
//     </div>
//   );
// };

// export default Header;











import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsername } from "../redux/slices/loginSlice";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import MoreOption from "./MoreOption";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const username = useSelector(getUsername);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  const fetchNotificationCount = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      const response = await fetch(
        "https://www.filmhooks.annulartech.net/admin/getTotalNotificationCount",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === 1) {
        setNotificationCount(data.data.totalNotificationCount);
      }
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  useEffect(() => {
    fetchNotificationCount();

    // Set up interval to fetch notifications periodically
    const intervalId = setInterval(fetchNotificationCount, 60000); // every minute

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleNotificationClick = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      // Call API to change notification status
      const response = await fetch(
        "https://www.filmhooks.annulartech.net/admin/changeNotificationStatus",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === 1) {
        // Reset notification count after successfully updating status
        setNotificationCount(0);
        
        // Navigate to dashboard
        navigate("/layout/dashboard");
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  return (
    <div className="h-[6%] w-full shadow-md flex items-center justify-end px-10">
      <div className="flex items-center justify-end w-[20%]">
        <div 
          className="relative mr-4 cursor-pointer hover:text-blue-500 transition-colors"
          onClick={handleNotificationClick}
          title="View notifications"
        >
          <IoMdNotifications className="text-2xl" />
          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </div>
        <p className="flex mr-3">
          <span className="text-2xl mr-2">
            <FaUserCircle />
          </span>
          {username}
        </p>
        <MoreOption />
      </div>
    </div>
  );
};

export default Header;