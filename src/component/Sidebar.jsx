// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
// import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
// import { RiAdminFill } from "react-icons/ri";
// import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
// import flimhookLogo from "../assets/logo/flimhookLogo.png";
// import { GoReport } from "react-icons/go";
// import { useDispatch } from "react-redux";
// import { userLogout } from "../redux/slices/loginSlice";
// import { Link } from "react-router-dom";
// import { UsersIcon } from "@heroicons/react/24/solid"; // Import users icon

// export default function Sidebar() {
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(0);
//   const [userType, setUserType] = useState(null);

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const handleLogout = () => {
//     dispatch(userLogout());
//   };

//   useEffect(() => {
//     setUserType(localStorage.getItem("userType"));
//   }, []);

//   return (
//     <div className="h-screen w-[20%] max-w-[20rem] bg-gray-100">
//       <div className="mb-2 p-4">
//         <img src={flimhookLogo} alt="" />
//       </div>
//       <List>
//         {userType === "SuperAdmin" && (
//           <Accordion
//             open={open === 1}
//             icon={
//               <ChevronDownIcon
//                 strokeWidth={2.5}
//                 className={`mx-auto h-4 w-4 transition-transform ${
//                   open === 1 ? "rotate-180" : ""
//                 }`}
//               />
//             }
//           >
//             <Link to="/layout">
//               <ListItem className="p-0" selected={open === 1}>
//                 <AccordionHeader
//                   onClick={() => handleOpen(1)}
//                   className="border-b-0 p-3"
//                 >
//                   <ListItemPrefix>
//                     <RiAdminFill className="h-5 w-5" />
//                   </ListItemPrefix>
//                   <Typography color="blue-gray" className="mr-auto font-normal">
//                     Admin Panel
//                   </Typography>
//                 </AccordionHeader>
//               </ListItem>
//             </Link>

//             <AccordionBody className="py-1">
//               <List className="p-0">
//                 <Link to="/layout/create_subadmin">
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Create SubAdmin
//                   </ListItem>
//                 </Link>
//               </List>
//             </AccordionBody>
//           </Accordion>
//         )}
//         <Link to="/layout/industrial_user">
//           <ListItem>
//             <ListItemPrefix>
//               <UserCircleIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Industrial User
//           </ListItem>
//         </Link>
//         <Link to="/layout/report">
//           <ListItem>
//             <ListItemPrefix>
//               <GoReport className="h-5 w-5" />
//             </ListItemPrefix>
//             Report
//           </ListItem>
//         </Link>

//         <Link to="/layout/user_list">
//           <ListItem>
//             <ListItemPrefix>
//               <GoReport className="h-5 w-5" />
//             </ListItemPrefix>
//             User Management
//           </ListItem>
//         </Link>

//         {/* User Management System Accordion */}
//         {/* <Accordion
//           open={open === 2}
//           icon={
//             <ChevronDownIcon
//               strokeWidth={2.5}
//               className={`mx-auto h-4 w-4 transition-transform ${
//                 open === 2 ? "rotate-180" : ""
//               }`}
//             />
//           }
//         > */}
//           {/* <ListItem className="p-0" selected={open === 2}>
//             <AccordionHeader
//               onClick={() => handleOpen(2)}
//               className="border-b-0 p-3"
//             >
//               <ListItemPrefix>
//                 <UsersIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               <Typography color="blue-gray" className="mr-auto font-normal">
//                 User Management
//               </Typography>
//             </AccordionHeader>
//           </ListItem> */}

//           {/* <AccordionBody className="py-1">
//             <List className="p-0">
//               <Link to="/layout/user_list">
//                 <ListItem>
//                   <ListItemPrefix>
//                     <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                   </ListItemPrefix>
//                   User List
//                 </ListItem>
//               </Link>
//               <Link to="/layout/user_roles">
//                 <ListItem>
//                   <ListItemPrefix>
//                     <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                   </ListItemPrefix>
//                   User Roles
//                 </ListItem>
//               </Link>
//               <Link to="/layout/permissions">
//                 <ListItem>
//                   <ListItemPrefix>
//                     <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                   </ListItemPrefix>
//                   Permissions
//                 </ListItem>
//               </Link>
//             </List>
//           </AccordionBody>
//         </Accordion> */}

//         <ListItem onClick={handleLogout}>
//           <ListItemPrefix>
//             <PowerIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Log Out
//         </ListItem>
//       </List>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import { RiAdminFill } from "react-icons/ri";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import flimhookLogo from "../assets/logo/flimhookLogo.png";
import { GoReport } from "react-icons/go";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/slices/loginSlice";
import { Link, useLocation } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(0);
  const [userType, setUserType] = useState(null);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Style variants for menu items
  const getMenuItemClasses = (path) => {
    return `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive(path)
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50"
      }`;
  };

  // Style for accordion headers
  const getAccordionHeaderClasses = (index) => {
    return `flex w-full items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${open === index
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50"
      }`;
  };

  // Style for accordion body items
  const getAccordionItemClasses = (path) => {
    return `flex items-center gap-3 py-2 px-8 rounded-lg transition-all duration-200 ${isActive(path)
        ? "bg-blue-100 text-blue-800 font-medium"
        : "text-gray-700 hover:bg-blue-50"
      }`;
  };

  return (
    <div className="h-screen w-96 bg-white shadow-lg flex flex-col overflow-y-auto">
      {/* Logo section with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
        <img src={flimhookLogo} alt="Flimhook Logo" className="max-h-12 mx-auto" />

        {/* User profile overview */}
        <div className="mt-6 pb-2 flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
            <UserCircleIcon className="h-6 w-6" />
          </div>
          <div className="ml-3">
            <Typography color="white" className="text-sm font-medium">
              {userType || "User"}
            </Typography>
            
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">


        <nav className="flex flex-col gap-1 mt-2">
          {/* Dashboard Link */}
          <Link to="/layout/dashboard">
            <div className={getMenuItemClasses("/layout")}>
              <div className="p-1 bg-blue-100 rounded text-blue-800">
                <RiAdminFill className="h-4 w-4" />
              </div>
              <span>Dashboard</span>
            </div>
          </Link>

          {/* SuperAdmin Panel */}
          {userType === "SuperAdmin" && (
            <div>
              <div
                className={getAccordionHeaderClasses(1)}
                onClick={() => handleOpen(1)}
              >
                <div className="p-1 bg-indigo-100 rounded text-indigo-800">
                  <RiAdminFill className="h-4 w-4" />
                </div>
                <Link to="/layout">
                  <span className="flex-1">Admin Panel</span>
                </Link>

                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                    }`}
                />
              </div>

              {open === 1 && (
                <div className="mt-1 ml-2">
                  <Link to="/layout/create_subadmin">
                    <div className={getAccordionItemClasses("/layout/create_subadmin")}>
                      <ChevronRightIcon className="h-3 w-3" />
                      <span>Create SubAdmin</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Industrial User Link */}
          <Link to="/layout/industrial_user">
            <div className={getMenuItemClasses("/layout/industrial_user")}>
              <div className="p-1 bg-green-100 rounded text-green-800">
                <UserCircleIcon className="h-4 w-4" />
              </div>
              <span>Industrial User</span>
            </div>
          </Link>

          {/* Report Link */}
          <Link to="/layout/report">
            <div className={getMenuItemClasses("/layout/report")}>
              <div className="p-1 bg-amber-100 rounded text-amber-800">
                <GoReport className="h-4 w-4" />
              </div>
              <span>Reports</span>
            </div>
          </Link>

          {/* User Management Link */}
          <Link to="/layout/user_list">
            <div className={getMenuItemClasses("/layout/user_list")}>
              <div className="p-1 bg-purple-100 rounded text-purple-800">
                <UsersIcon className="h-4 w-4" />
              </div>
              <span>SubAdmin Details</span>
            </div>
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full py-2.5 px-4 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
        >
          <PowerIcon className="h-5 w-5 text-red-500" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}