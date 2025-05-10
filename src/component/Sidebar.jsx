
// import React, { useState, useEffect } from "react";
// import { Typography } from "@material-tailwind/react";
// import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
// import { RiAdminFill } from "react-icons/ri";
// import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
// import flimhookLogo from "../assets/logo/Logo.png"; //changing
// import { GoReport } from "react-icons/go";
// import { useDispatch } from "react-redux";
// import { userLogout } from "../redux/slices/loginSlice";
// import { Link, useLocation } from "react-router-dom";
// import { UsersIcon } from "@heroicons/react/24/solid";

// export default function Sidebar() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [open, setOpen] = useState(0);
//   const [userType, setUserType] = useState(null);

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };

 

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       dispatch(userLogout());
//       console.log("Logged out successfully!");
//     } else {
//       console.log("Logout canceled.");
//     }
//   };   // changing 28


  

//   useEffect(() => {
//     console.log(userType)
//     setUserType(localStorage.getItem("userType"));
    
//   }, []);


//   useEffect(()=>{
    
//     if(userType === "SuperAdmin"){
//       setUserType("Super  Admin")
//       console.log(userType) // changing 29

//     }
//   })

//   // Check if a path is active
//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   // Style variants for menu items
//   const getMenuItemClasses = (path) => {
//     return `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive(path)
//         ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
//         : "text-gray-700 hover:bg-blue-50"
//       }`;
//   };

//   // Style for accordion headers
//   const getAccordionHeaderClasses = (index) => {
//     return `flex w-full items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${open === index
//         ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
//         : "text-gray-700 hover:bg-blue-50"
//       }`;
//   };

//   // Style for accordion body items
//   const getAccordionItemClasses = (path) => {
//     return `flex items-center gap-3 py-2 px-8 rounded-lg transition-all duration-200 ${isActive(path)
//         ? "bg-blue-100 text-blue-800 font-medium"
//         : "text-gray-700 hover:bg-blue-50"
//       }`;
//   };

//   // logout alertpopup

  

//   return (
//     <div className="h-screen w-96 bg-white shadow-lg flex flex-col overflow-y-auto  ">
//       {/* Logo section with gradient background */}
//       <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
//   <div className="flex flex-col">
//     <img src={flimhookLogo} alt="Flimhook Logo" className="max-h-12 mb-2" />
//     <div className="mt-8 flex items-center">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//       </svg>
//       <Typography color="white" className="text-lg font-medium">
//         {userType || "Super Admin"}
//       </Typography>
//     </div>
//   </div>
// </div>
//       {/* Navigation Menu */}
//       <div className="flex-1 p-4">


//         <nav className="flex flex-col gap-1 mt-2">
//           {/* Dashboard Link */}
//           <Link to="/layout/dashboard">
//             <div className={getMenuItemClasses("/layout/dashboard")}>
//               <div className="p-1 bg-blue-100 rounded text-blue-800">
//                 <RiAdminFill className="h-4 w-4" />
//               </div>
//               <span>Dashboard</span>
//             </div>
//           </Link>

//           {/* SuperAdmin Panel */}
//           {userType === "Super Admin" && (
//             <div>
//               <div
//                 className={getAccordionHeaderClasses(1)}
//                 onClick={() => handleOpen(1)}
//               >
//                 <div className="p-1 bg-indigo-100 rounded text-indigo-800">
//                   <RiAdminFill className="h-4 w-4" />
//                 </div>
//                 <Link to="/layout">
//                   <span className="flex-1">Admin Panel</span>
//                 </Link>

//                 <ChevronDownIcon
//                   className={`h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
//                     }`}
//                 />
//               </div>

//               {open === 1 && (
//                 <div className="mt-1 ml-2">
//                   <Link to="/layout/create_subadmin">
//                     <div className={getAccordionItemClasses("/layout/create_subadmin")}>
//                       <ChevronRightIcon className="h-3 w-3" />
//                       <span>Create SubAdmin</span>
//                     </div>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Industrial User Link */}
//           <Link to="/layout/industrial_user">
//             <div className={getMenuItemClasses("/layout/industrial_user")}>
//               <div className="p-1 bg-green-100 rounded text-green-800">
//                 <UserCircleIcon className="h-4 w-4" />
//               </div>
//               <span>Industry User Request</span>
//             </div>
//           </Link>

//           <Link to="/layout/verified">
//             <div className={getMenuItemClasses("/layout/verified")}>
//               <div className="p-1 bg-green-100 rounded text-green-800">
//                 <UserCircleIcon className="h-4 w-4" />
//               </div>
//               <span>Verified list </span>
//             </div>
//           </Link>

//           <Link to="/layout/rejected">
//             <div className={getMenuItemClasses("/layout/rejected")}>
//               <div className="p-1 bg-green-100 rounded text-green-800">
//                 <UserCircleIcon className="h-4 w-4" />
//               </div>
//               <span>Rejected List</span>
//             </div>
//           </Link>

//           {/* Report Link */}
//           <Link to="/layout/report">
//             <div className={getMenuItemClasses("/layout/report")}>
//               <div className="p-1 bg-amber-100 rounded text-amber-800">
//                 <GoReport className="h-4 w-4" />
//               </div>
//               <span>Report Post</span>
//             </div>
//           </Link>

//           {/* User Management Link */}
//           <Link to="/layout/user_list">
//             <div className={getMenuItemClasses("/layout/user_list")}>
//               <div className="p-1 bg-purple-100 rounded text-purple-800">
//                 <UsersIcon className="h-4 w-4" />
//               </div>
//               <span>SubAdmin Details</span>
//             </div>
//           </Link>
//         </nav>
//       </div>

//       {/* Logout Button */}
//       <div className="p-4 border-t border-gray-200">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 w-full py-2.5 px-4 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
//         >
//           <PowerIcon className="h-5 w-5 text-red-500" />
//           <span >Log Out</span>
//         </button>
//       </div>
//     </div>
//   );
// }














import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import { RiAdminFill } from "react-icons/ri";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import flimhookLogo from "../assets/logo/Logo.png";
import { GoReport } from "react-icons/go";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/slices/loginSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const [userType, setUserType] = useState(null);
  const [industryUserCount, setIndustryUserCount] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(userLogout());
      console.log("Logged out successfully!");
    } else {
      console.log("Logout canceled.");
    }
  };

  // Fetch industry user count
  const fetchIndustryUserCount = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        "https://www.filmhooks.annulartech.net/admin/getIndustryUserCount",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.status === 1) {
        setIndustryUserCount(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching industry user count:", error);
    }
  };

  // Handle industry user request click
  const handleIndustryUserClick = async () => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.post(
        "https://www.filmhooks.annulartech.net/admin/changeNotificationStatusByIndustryUsers",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Reset count after API call
      setIndustryUserCount(0);
      
      // Navigate to the industrial user page
      navigate("/layout/industrial_user");
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
    
    // Initial fetch of industry user count
    fetchIndustryUserCount();
    
    // Set up interval to fetch count every 5 minutes
    // const intervalId = setInterval(fetchIndustryUserCount, 5 * 60 * 1000);


    const intervalId = setInterval(fetchIndustryUserCount, 30 * 1000);

    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (userType === "SuperAdmin") {
      setUserType("Super Admin");
    }
  }, [userType]);

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Style variants for menu items
  const getMenuItemClasses = (path) => {
    return `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
      isActive(path)
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50"
    }`;
  };

  // Style for accordion headers
  const getAccordionHeaderClasses = (index) => {
    return `flex w-full items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${
      open === index
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-blue-50"
    }`;
  };

  // Style for accordion body items
  const getAccordionItemClasses = (path) => {
    return `flex items-center gap-3 py-2 px-8 rounded-lg transition-all duration-200 ${
      isActive(path)
        ? "bg-blue-100 text-blue-800 font-medium"
        : "text-gray-700 hover:bg-blue-50"
    }`;
  };

  return (
    <div className="h-screen w-96 bg-white shadow-lg flex flex-col overflow-y-auto">
      {/* Logo section with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
        <div className="flex flex-col">
          <img src={flimhookLogo} alt="Flimhook Logo" className="max-h-12 mb-2" />
          <div className="mt-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <Typography color="white" className="text-lg font-medium">
              {userType || "Super Admin"}
            </Typography>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <nav className="flex flex-col gap-1 mt-2">
          {/* Dashboard Link */}
          <Link to="/layout/dashboard">
            <div className={getMenuItemClasses("/layout/dashboard")}>
              <div className="p-1 bg-blue-100 rounded text-blue-800">
                <RiAdminFill className="h-4 w-4" />
              </div>
              <span>Dashboard</span>
            </div>
          </Link>

          {/* SuperAdmin Panel */}
          {userType === "Super Admin" && (
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
                  className={`h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
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

          {/* Industrial User Link with count badge */}
          <div className={getMenuItemClasses("/layout/industrial_user")} onClick={handleIndustryUserClick}>
            <div className="p-1 bg-green-100 rounded text-green-800">
              <UserCircleIcon className="h-4 w-4" />
            </div>
            <span className="flex-1">Industry User Request</span>
            {industryUserCount > 0 && (
              <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold">
                {industryUserCount}
              </div>
            )}
          </div>

          <Link to="/layout/verified">
            <div className={getMenuItemClasses("/layout/verified")}>
              <div className="p-1 bg-green-100 rounded text-green-800">
                <UserCircleIcon className="h-4 w-4" />
              </div>
              <span>Verified list</span>
            </div>
          </Link>

          <Link to="/layout/rejected">
            <div className={getMenuItemClasses("/layout/rejected")}>
              <div className="p-1 bg-green-100 rounded text-green-800">
                <UserCircleIcon className="h-4 w-4" />
              </div>
              <span>Rejected List</span>
            </div>
          </Link>

          {/* Report Link */}
          <Link to="/layout/report">
            <div className={getMenuItemClasses("/layout/report")}>
              <div className="p-1 bg-amber-100 rounded text-amber-800">
                <GoReport className="h-4 w-4" />
              </div>
              <span>Report Post</span>
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