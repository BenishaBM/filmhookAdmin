import React, { useEffect, useState } from 'react'
import { Eye } from 'lucide-react';
import UnverfiedUserDetailsData from '../verifieddata/UnverfiedUserDetailsData';
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";

const IndustryUser = () => {

    const [users, setUsers] = useState([]);
      const [pageInfo, setPageInfo] = useState({
        totalRecords: 0,
        totalPages: 0,
      });
      const [currentPage, setCurrentPage] = useState(1);
      const [pageSize, setPageSize] = useState(10);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [selectKey, setSelectKey] = useState(Date.now());
      const [selectedUser, setSelectedUser] = useState(null);
      const [showDetails, setShowDetails] = useState(false);
      const [searchName, setSearchName] = useState("");
    
      const fetchData = async (page = 1, size = 10) => {
        setLoading(true);
        try {
          const token = localStorage.getItem("jwt");
    
          if (!token) {
            throw new Error("Authentication token not found");
          }
    
          const response = await fetch(
            `https://www.filmhooks.annulartech.net/admin/getAllAdminUsersByUserType?userType=Industry User&pageNo=${page}&pageSize=${size}&status=false`,
            // `https://www.filmhooks.annulartech.net/admin/getAllAdminUsersByUserType?userType=Private User&pageNo=${page}&pageSize=${size}&status=false`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
    
          const result = await response.json();
          console.log(result.data);
          
    
          if (result.status === 1) {
            setUsers(result.data.users);
            setPageInfo(result.data);
            // setPageInfo(result.data.PageInfo || { totalPages: 0, totalRecords: 0 });
          } else {
            throw new Error(result.message || "Failed to fetch data");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData(currentPage, pageSize);
      }, [currentPage, pageSize]);
    
    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShowDetails(true);
    };

    const handleBackToList = () => {
        setShowDetails(false);
        setSelectedUser(null);
    };

      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < pageInfo.totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      };
    
      const handlePageSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setPageSize(newSize);
        setCurrentPage(1);
        setSelectKey(Date.now());
      };
    
        const handleSearch = (e) => {
        console.log("name", e.target.value);
        setSearchName(e.target.value);
      };

        if (showDetails && selectedUser) {
          return (
            <div className="relative mt-16">
              <button 
                onClick={handleBackToList}
                className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to List
              </button>
              <button 
                onClick={handleBackToList}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-transparent text-white rounded-full hover:bg-blue-900 transition flex items-center justify-center"
              >
                <span className="hover:scale-125">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

                </span>

                {/* Close */}
              </button>
              
              <UnverfiedUserDetailsData userId={selectedUser} />
            </div>
          );
        }
  return (
    <>
      <div className="p-4 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
                {/* <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden"> */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Public User List
                  </h1>
                </div>
      
                <div className="p-6 overflow-y-auto max-h-[calc(87vh-120px)]">
                  {/* {authError && (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
                                  <AlertCircle className="mr-2" size={20} />
                                  <div>
                                    <p className="font-medium">Authentication Error</p>
                                    <p>Please log in to access the user data.</p>
                                  </div>
                                  <button 
                                    onClick={handleLogin}
                                    className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                                  >
                                    Log In
                                  </button>
                                </div>
                              )} */}
      
                  {loading && (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Loading data...</p>
                    </div>
                  )}
      
                  {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                      <p>{error}</p>
                    </div>
                  )}
      
                  {!loading && !error && users.length > 0 && (
                    <>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden">
                          {/* <table className="min-w-full bg-white border border-gray-200 rounded-lg"> */}
                          <thead className="bg-gray-50">
                            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                              {/* <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white whitespace-nowrap">
                                      User ID
                                  </th>
                                  <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white whitespace-nowrap">
                                      Name
                                  </th>
                                  <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white whitespace-nowrap">
                                      Email
                                  </th>
                                  <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white whitespace-nowrap">
                                      Gender
                                  </th>
                                  <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white whitespace-nowrap">
                                      Data of Birth
                                  </th>
                                  <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white whitespace-nowrap">
                                      Phone Number
                                  </th>
                                  <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white whitespace-nowrap">
                                      Actions
                                  </th> */}
                              {[
                                "User ID",
                                "Name",
                                "Email",
                                "Gender",
                                "Date of Birth",
                                "Phone Number",
                                "Actions",
                              ].map((title) => (
                                <th
                                  key={title}
                                  className="py-3 px-4 text-left font-medium text-white whitespace-nowrap z-10"
                                  // className="py-3 px-4 text-left font-medium text-white whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-600 z-10"
                                >
                                  {title}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, index) => (
                              <tr
                                key={user.userId}
                                className="border-b border-gray-200 hover:bg-gray-50 [&:nth-child(odd)]:bg-gray-100"
                              >
                                <td className="py-3 px-4">{user.userId || "NA"}</td>
                                <td className="py-3 px-4">{user.name || "NA"}</td>
                                <td className="py-3 px-4">{user.email || "NA"}</td>
                                <td className="py-3 px-4">{user.gender || "NA"}</td>
                                <td className="py-3 px-4">{user.dob || "NA"}</td>
                                <td className="py-3 px-4">
                                  {user.phoneNumber || "NA"}
                                </td>
                                <td className="py-3 px-4">
                                  <button
                                    onClick={() => handleViewDetails(user.userId)}
                                    className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition whitespace-nowrap"
                                  >
                                    <Eye size={16} className="mr-1" />
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
      
                {loading && error && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      No data found for the selected date range.
                    </p>
                  </div>
                )}
                {/* New Pagination Component */}
                {!loading && (
                  <div className="flex justify-between items-center p-4 mt-4">
                    <div className="text-sm text-gray-600">
                      Showing Page {currentPage} of {pageInfo.totalPages || 1}
                    </div>
      
                    <div className="flex items-center gap-4">
                      <div className="h-8 flex items-center justify-center rounded border border-gray-300">
                        <select
                          key={selectKey}
                          value={pageSize}
                          onChange={handlePageSizeChange}
                          className="w-16 h-full text-sm border-0 rounded px-2 focus:ring-0 focus:outline-none"
                        >
                          {[5, 10, 15, 20, 25].map((size) => (
                            <option key={size} value={size} className="py-1 text-sm">
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
      
                      <button
                        disabled={currentPage === 1}
                        className={`px-4 py-1 rounded border border-gray-300 text-sm ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-100"
                        }`}
                        onClick={handlePreviousPage}
                      >
                        PREVIOUS
                      </button>
      
                      <button
                        disabled={
                          currentPage === pageInfo.totalPages ||
                          pageInfo.totalPages === 0
                        }
                        className={`px-4 py-1 rounded border border-gray-300 text-sm ${
                          currentPage === pageInfo.totalPages ||
                          pageInfo.totalPages === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-100"
                        }`}
                        onClick={handleNextPage}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
    </>
  )
}

export default IndustryUser