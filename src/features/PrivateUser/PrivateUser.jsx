import React, { useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

const PrivateUser = () => {
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
  const [searchName, setSearchName] = useState("");

  const fetchData = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllAdminUsersByUserType?userType=Private User&pageNo=${page}&pageSize=${size}&status=false`,
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

      if (result.status === 1) {
        setUsers(result.data.users);
        // setPageInfo(result.data.PageInfo);
        setPageInfo(result.data.PageInfo || { totalPages: 0, totalRecords: 0 });
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
  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        {/* <h1 className="text-2xl font-bold mb-6">Private User List</h1> */}
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Private User List
          </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Search Bar */}
                  {/* <div className="p-6 border-b border-gray-100 bg-gray-50 ">
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-96">
                      <div className="w-full md:w-72 relative flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                          placeholder="Search reports..."
                          onChange={handleSearch}
                        />
                      </div>
        
        
                    </div>
                  </div> */}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50 ">
                  <tr className="bg-gradient-to-r from-blue-500 to-indigo-600">
                    <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white">
                      User ID
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white">
                      Gender
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white">
                      Data of Birth
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700 border-b text-white">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        key={user.userId}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{user.userId || "NA"}</td>
                        <td className="py-3 px-4">{user.name || "NA"}</td>
                        <td className="py-3 px-4">{user.email || "NA"}</td>
                        <td className="py-3 px-4">{user.gender || "NA"}</td>
                        <td className="py-3 px-4">{user.dob || "NA"}</td>
                        <td className="py-3 px-4">
                          {user.phoneNumber || "NA"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 text-center text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
          </div>

          </>
        )}
      </div>
    </>
  );
};

export default PrivateUser;
