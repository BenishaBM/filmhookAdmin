// import React, { useEffect, useState } from "react";
// import {
//     Card,
//     Typography,
//     Button,
//     IconButton,
//     Spinner,
//     Dialog,
//     DialogHeader,
//     DialogBody,
//     DialogFooter,
// } from "@material-tailwind/react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     getAllUsersAction,
//     updateUserStatusAction,
//     deleteUserAction,
//     resetActionStatus
// } from "../../redux/slices/UsermanagementSlice";
// import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
// import { useNavigate, useLocation, useSearchParams, useParams } from "react-router-dom";

// const UserList = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [searchParams, setSearchParams] = useSearchParams();

//     // State selectors from Redux
//     const {
//         usersList,
//         totalUsers,
//         usersListLoadingStatus,
//         usersListErrorMessage,
//         actionStatus,
//         actionErrorMessage,
//         actionSuccessMessage
//     } = useSelector((state) => state.userManagement);

//     // Get page from URL or default to 1
//     const getPageFromUrl = () => {
//         const pageFromUrl = searchParams.get("page");
//         return pageFromUrl ? parseInt(pageFromUrl) : 1;
//     };

//     // Get limit from URL or default to 10
//     const getLimitFromUrl = () => {
//         const limitFromUrl = searchParams.get("limit");
//         return limitFromUrl ? parseInt(limitFromUrl) : 10;
//     };

//     // Local state
//     const [currentPage, setCurrentPage] = useState(getPageFromUrl());
//     const [limit, setLimit] = useState(getLimitFromUrl());
//     const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [selectedUserId, setSelectedUserId] = useState(null);

//     // Calculate total pages
//     const totalPages = Math.ceil(totalUsers / limit) || 1;

//     // Debug log
//     useEffect(() => {
//         console.log("Users data:", {
//             usersList,
//             totalUsers,
//             currentPage,
//             usersListLoadingStatus,
//             limit
//         });
//     }, [usersList, totalUsers, currentPage, usersListLoadingStatus, limit]);

//     // Update URL when pagination parameters change
//     useEffect(() => {
//         const params = new URLSearchParams();
//         params.set("page", currentPage.toString());
//         params.set("limit", limit.toString());
//         if (searchTerm) params.set("search", searchTerm);

//         // Update URL without reloading the page
//         navigate(`${location.pathname}?${params.toString()}`, { replace: true });

//         // Fetch data with the new parameters
//         loadUsers();
//     }, [currentPage, limit, searchTerm]);

//     // Update state when URL changes (browser back/forward)
//     useEffect(() => {
//         const pageFromUrl = getPageFromUrl();
//         const limitFromUrl = getLimitFromUrl();
//         const searchFromUrl = searchParams.get("search") || "";

//         // Only update state if values differ to prevent infinite loops
//         if (pageFromUrl !== currentPage) {
//             setCurrentPage(pageFromUrl);
//         }
//         if (limitFromUrl !== limit) {
//             setLimit(limitFromUrl);
//         }
//         if (searchFromUrl !== searchTerm) {
//             setSearchTerm(searchFromUrl);
//         }
//     }, [location.search]);

//     // Reset action status when unmounting
//     useEffect(() => {
//         return () => {
//             dispatch(resetActionStatus());
//         };
//     }, []);

//     // Listen for action status changes
//     useEffect(() => {
//         if (actionStatus === "succeeded") {
//             // Refresh the users list
//             loadUsers();
//             // Close dialog if open
//             setDeleteDialogOpen(false);
//             // Reset action status after 3 seconds
//             setTimeout(() => {
//                 dispatch(resetActionStatus());
//             }, 3000);
//         }
//     }, [actionStatus]);

//     const loadUsers = () => {
//         // Make API call with pagination parameters
//         dispatch(getAllUsersAction({
//             page: currentPage,
//             limit: limit,
//             search: searchTerm.trim()
//         }));
//     };

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//         // URL and data fetching handled by useEffect
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         setCurrentPage(1); // Reset to first page when searching
//         // URL and data fetching handled by useEffect
//     };

//     const handleDeleteUser = (userId) => {
//         setSelectedUserId(userId);
//         setDeleteDialogOpen(true);
//     };

//     const confirmDeleteUser = () => {
//         if (selectedUserId) {
//             dispatch(deleteUserAction(selectedUserId));
//         }
//     };

//     const handleUpdateStatus = (userId, currentStatus) => {
//         dispatch(updateUserStatusAction({
//             userId: userId,
//             isActive: !currentStatus
//         }));
//     };

//     const handleEditUser = (userId) => {
//         navigate(`/layout/user_edit/${userId}`);
//     };

//     const handleViewUser = (userId) => {
//         navigate(`/layout/user_details/${userId}`);
//     };

//     // Change per page limit
//     const handleLimitChange = (e) => {
//         const newLimit = parseInt(e.target.value);
//         setLimit(newLimit);
//         setCurrentPage(1); // Reset to first page when changing the limit
//         // URL and data fetching handled by useEffect
//     };

//     // Render pagination controls
//     const renderPagination = () => {
//         const maxVisiblePages = 5;
//         let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//         let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//         if (endPage - startPage + 1 < maxVisiblePages) {
//             startPage = Math.max(1, endPage - maxVisiblePages + 1);
//         }

//         const pageButtons = [];

//         // First button
//         if (currentPage > 1) {
//             pageButtons.push(
//                 <Button
//                     key="first"
//                     variant="outlined"
//                     color="gray"
//                     size="sm"
//                     onClick={() => handlePageChange(1)}
//                     className="mx-1"
//                 >
//                     First
//                 </Button>
//             );
//         }

//         // Previous button
//         pageButtons.push(
//             <Button
//                 key="prev"
//                 variant="outlined"
//                 color="gray"
//                 size="sm"
//                 onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="mx-1"
//             >
//                 Previous
//             </Button>
//         );

//         // Page numbers
//         for (let i = startPage; i <= endPage; i++) {
//             pageButtons.push(
//                 <Button
//                     key={i}
//                     variant={currentPage === i ? "filled" : "outlined"}
//                     color={currentPage === i ? "blue" : "gray"}
//                     size="sm"
//                     onClick={() => handlePageChange(i)}
//                     className="mx-1"
//                 >
//                     {i}
//                 </Button>
//             );
//         }

//         // Next button
//         pageButtons.push(
//             <Button
//                 key="next"
//                 variant="outlined"
//                 color="gray"
//                 size="sm"
//                 onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//                 className="mx-1"
//             >
//                 Next
//             </Button>
//         );

//         // Last button
//         if (currentPage < totalPages) {
//             pageButtons.push(
//                 <Button
//                     key="last"
//                     variant="outlined"
//                     color="gray"
//                     size="sm"
//                     onClick={() => handlePageChange(totalPages)}
//                     className="mx-1"
//                 >
//                     Last
//                 </Button>
//             );
//         }

//         return (
//             <div className="flex flex-wrap justify-center gap-2 mt-4">
//                 {pageButtons}
//             </div>
//         );
//     };

//     return (
//         <div className="p-4">
//             <Card className="w-full shadow-lg mb-4">
//                 <div className="p-4">
//                     <div className="flex items-center justify-between mb-4">
//                         <Typography variant="h5" color="blue-gray">
//                             User Management
//                         </Typography>
//                         <div className="flex items-center gap-4">
//                             <form onSubmit={handleSearch} className="flex items-center gap-2">
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         placeholder="Search users..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                 </div>
//                                 <Button type="submit" color="blue" size="sm">
//                                     Search
//                                 </Button>
//                             </form>

//                             {/* Rows per page selector */}
//                             <div className="flex items-center gap-2">
//                                 <Typography variant="small" color="blue-gray">
//                                     Rows per page:
//                                 </Typography>
//                                 <select 
//                                     value={limit}
//                                     onChange={handleLimitChange}
//                                     className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 >
//                                     <option value={5}>5</option>
//                                     <option value={10}>10</option>
//                                     <option value={25}>25</option>
//                                     <option value={50}>50</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Success message */}
//                     {actionStatus === "succeeded" && actionSuccessMessage && (
//                         <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md mb-4">
//                             {actionSuccessMessage}
//                         </div>
//                     )}

//                     {/* Error message */}
//                     {(actionStatus === "failed" || usersListLoadingStatus === "failed") && (
//                         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4">
//                             {actionErrorMessage || usersListErrorMessage || "An error occurred"}
//                         </div>
//                     )}

//                     {/* Loading state */}
//                     {usersListLoadingStatus === "loading" && (
//                         <div className="flex justify-center my-8">
//                             <Spinner className="h-12 w-12" color="blue" />
//                         </div>
//                     )}

//                     {/* Users table */}
//                     {usersListLoadingStatus === "succeeded" && (
//                         <div className="overflow-x-auto">
//                             <table className="w-full min-w-max table-auto text-left">
//                                 <thead>
//                                     <tr>
//                                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                             <Typography variant="small" color="blue-gray" className="font-bold">
//                                                 Name
//                                             </Typography>
//                                         </th>
//                                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                             <Typography variant="small" color="blue-gray" className="font-bold">
//                                                 Email
//                                             </Typography>
//                                         </th>
//                                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                             <Typography variant="small" color="blue-gray" className="font-bold">
//                                                 Gender
//                                             </Typography>
//                                         </th>
//                                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                             <Typography variant="small" color="blue-gray" className="font-bold">
//                                                 Phone number
//                                             </Typography>
//                                         </th>
//                                         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                                             <Typography variant="small" color="blue-gray" className="font-bold">
//                                                 Actions
//                                             </Typography>
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {usersList.length > 0 ? (
//                                         usersList.map((user, index) => {
//                                             const isLast = index === usersList.length - 1;
//                                             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

//                                             return (
//                                                 <tr key={user._id}>
//                                                     <td className={classes}>
//                                                         <Typography variant="small" color="blue-gray" className="font-normal">
//                                                             {user.name || "N/A"}
//                                                         </Typography>
//                                                     </td>
//                                                     <td className={classes}>
//                                                         <Typography variant="small" color="blue-gray" className="font-normal">
//                                                             {user.email || "N/A"}
//                                                         </Typography>
//                                                     </td>
//                                                     <td className={classes}>
//                                                         <Typography variant="small" color="blue-gray" className="font-normal">
//                                                             {user.gender || "User"}
//                                                         </Typography>
//                                                     </td>
//                                                     <td className={classes}>
//                                                         <Typography variant="small" color="blue-gray" className="font-normal">
//                                                             {user.phoneNumber || "Number not available"}
//                                                         </Typography>
//                                                     </td>
//                                                     <td className={classes}>
//                                                         <div className="flex items-center gap-2">
//                                                             <IconButton
//                                                                 color="blue"
//                                                                 size="sm"
//                                                                 onClick={() => handleViewUser(user._id)}
//                                                                 className="rounded-full"
//                                                             >
//                                                                 <FiEye size={16} />
//                                                             </IconButton>
//                                                             <IconButton
//                                                                 color="amber"
//                                                                 size="sm"
//                                                                 onClick={() => handleEditUser(user._id)}
//                                                                 className="rounded-full"
//                                                             >
//                                                                 <FiEdit size={16} />
//                                                             </IconButton>
//                                                             <IconButton
//                                                                 color="red"
//                                                                 size="sm"
//                                                                 onClick={() => handleDeleteUser(user._id)}
//                                                                 className="rounded-full"
//                                                             >
//                                                                 <FiTrash2 size={16} />
//                                                             </IconButton>
//                                                             <Button
//                                                                 size="sm"
//                                                                 color={user.isActive ? "red" : "green"}
//                                                                 onClick={() => handleUpdateStatus(user._id, user.isActive)}
//                                                                 className="ml-2"
//                                                             >
//                                                                 {user.isActive ? "Deactivate" : "Activate"}
//                                                             </Button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })
//                                     ) : (
//                                         <tr>
//                                             <td colSpan={5} className="p-4 text-center">
//                                                 <Typography variant="small" color="blue-gray">
//                                                     No users found
//                                                 </Typography>
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}

//                     {/* Pagination with stats */}
//                     {usersListLoadingStatus === "succeeded" && totalPages > 0 && (
//                         <>
//                             <div className="mt-4 text-center">
//                                 <Typography variant="small" color="blue-gray">
//                                     Showing page {currentPage} of {totalPages} ({totalUsers} total users)
//                                 </Typography>
//                             </div>
//                             <div className="mt-2">
//                                 {renderPagination()}
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </Card>

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={deleteDialogOpen} handler={() => setDeleteDialogOpen(false)}>
//                 <DialogHeader>Confirm Delete</DialogHeader>
//                 <DialogBody>
//                     Are you sure you want to delete this user? This action cannot be undone.
//                 </DialogBody>
//                 <DialogFooter>
//                     <Button
//                         variant="text"
//                         color="gray"
//                         onClick={() => setDeleteDialogOpen(false)}
//                         className="mr-2"
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="gradient"
//                         color="red"
//                         onClick={confirmDeleteUser}
//                         disabled={actionStatus === "loading"}
//                     >
//                         {actionStatus === "loading" ? (
//                             <Spinner className="h-4 w-4 mr-2" />
//                         ) : (
//                             "Delete"
//                         )}
//                     </Button>
//                 </DialogFooter>
//             </Dialog>
//         </div>
//     );
// };

// export default UserList;


// import React from 'react'
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserAction, increasecount, uservalues, valuees } from '../../redux/slices/UsermanagementSlice';

// const UserList = () => {
//     const valueans = useSelector(valuees)
//     const valueofuser = useSelector(uservalues);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         const pageDetails = {
//             pageNo: 1,
//             pageSize: 4,
//         };
//         const valuess = dispatch(getUserAction(pageDetails))
//         console.log(valueofuser)

//     }, [])
//     return (
//         <div>
//             <p> count : {valueans} </p>
//             <button onClick={() => { dispatch(increasecount()) }}>
//                 increase button
//             </button>


//         </div>
//     )
// }

// export default UserList


import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction, increasecount, uservalues, valuees } from '../../redux/slices/UsermanagementSlice';
import Pagination from './Pagination';

const UserList = () => {
    const valueans = useSelector(valuees);
    const valueofuser = useSelector(uservalues);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [userData, setUserData] = useState([]);
    const totalPages = 10;

    useEffect(() => {
        loadUsers();
    }, [currentPage, pageSize]);

    useEffect(() => {
        console.log("valueofuser changed:", valueofuser);

        if (valueofuser) {
            if (Array.isArray(valueofuser)) {
                setUserData(valueofuser);
            } else if (valueofuser.data && Array.isArray(valueofuser.data)) {
                setUserData(valueofuser.data);
            } else {
                console.log("Unknown data structure, raw valueofuser:", valueofuser);
                setUserData([]);
            }
        }
    }, [valueofuser, pageSize]);

    const loadUsers = () => {
        const pageDetails = {
            pageNo: currentPage,
            pageSize: pageSize,
        };
        console.log("Dispatching getUserAction with:", pageDetails);
        dispatch(getUserAction(pageDetails));
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="user-list-container min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section with Gradient Text */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        SubAdmin Details
                    </h1>
                    {/* <p className="mt-2 text-gray-600">Manage and view all system users</p> */}
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl">
                    {/* Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                    <th className="py-4 px-6 text-left font-semibold">User ID</th>
                                    <th className="py-4 px-6 text-left font-semibold">Name</th>
                                    <th className="py-4 px-6 text-left font-semibold">Email</th>
                                    <th className="py-4 px-6 text-left font-semibold">Gender</th>
                                    <th className="py-4 px-6 text-left font-semibold">Date of Birth</th>
                                    <th className="py-4 px-6 text-left font-semibold">Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.length > 0 ? (
                                    userData.map((user, index) => (
                                        <tr
                                            key={user.userId || index}
                                            className={`border-b border-gray-100 transition-colors duration-200 hover:bg-indigo-50 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
                                        >
                                            <td className="py-3 px-6 text-gray-800">{user.userId}</td>
                                            <td className="py-3 px-6 text-gray-800 font-medium">{user.name}</td>
                                            <td className="py-3 px-6 text-gray-800">{user.email}</td>
                                            <td className="py-3 px-6 text-gray-800">{user.gender}</td>
                                            <td className="py-3 px-6 text-gray-800">{user.dob}</td>
                                            <td className="py-3 px-6 text-gray-800">{user.phoneNumber}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8 px-6 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg
                                                    className="w-12 h-12 text-gray-300 mb-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                    ></path>
                                                </svg>
                                                <p className="text-lg font-medium">No users found</p>
                                                <p className="mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer with Pagination */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            {/* Page Size Selector */}
                            <div className="flex items-center space-x-2">
                                <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">Users per page:</label>
                                <select
                                    id="pageSize"
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                                >
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                    <option value="20">20</option>
                                </select>
                            </div>

                            {/* Pagination Component */}
                            <div className="mt-2 sm:mt-0">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats or Additional Info Card */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {valueofuser?.totalCount || userData?.length || 0}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-lg font-semibold text-gray-700">Pages</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            {currentPage} / {totalPages}
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default UserList;