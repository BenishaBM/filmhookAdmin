
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