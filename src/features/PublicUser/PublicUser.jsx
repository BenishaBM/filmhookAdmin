import React, { useEffect, useState } from "react";
import UnverfiedUserDetailsData from "../verifieddata/UnverfiedUserDetailsData";

const PublicUser = () => {
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

  const fetchData = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllAdminUsersByUserType?userType=Public User&pageNo=${page}&pageSize=${size}&status=false`,
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

  // console.log(users);

  //     const handleBackToList = () => {
  //     setShowDetails(false);
  //     setSelectedUser(null);
  //   };

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

  //   if (showDetails && selectedUser) {
  //     return (
  //       <div className="relative mt-16">
  //         <button
  //           onClick={handleBackToList}
  //           className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
  //         >
  //           <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
  //           </svg>
  //           Back to List
  //         </button>

  //         <UnverfiedUserDetailsData userId={selectedUser} />
  //       </div>
  //     );
  //   }

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        {/* <h1 className="text-2xl font-bold mb-6">Publist User List</h1> */}
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Public User List
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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

export default PublicUser;
