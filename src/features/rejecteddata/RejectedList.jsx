
// import React, { useState, useEffect } from 'react';
// import { Eye } from 'lucide-react';

// const RejectedList = () => {
//   const [users, setUsers] = useState([]);
//   const [pageInfo, setPageInfo] = useState({
//     totalRecords: 0,
//     totalPages: 0
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Function to fetch data from API
//   const fetchData = async (page = 1, size = 3) => {
//     setLoading(true);
//     try {
//       // Get token from localStorage
//       const token = localStorage.getItem('jwt');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }
      
//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUnVerifiedRejectedList?pageNo=${page}&pageSize=${size}&status=false`, 
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
      
//       const result = await response.json();
      
//       if (result.status === 1) {
//         setUsers(result.data.Data);
//         setPageInfo(result.data.PageInfo);
//       } else {
//         throw new Error(result.message || 'Failed to fetch data');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage, pageSize);
//   }, [currentPage, pageSize]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleViewDetails = (user) => {
//     setSelectedUser(user);
//   };

//   const closeDetails = () => {
//     setSelectedUser(null);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">verified/Rejected Users</h1>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Rejected Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length > 0 ? (
//                   users.map(user => (
//                     <tr key={user.userId} className="border-t border-gray-200 hover:bg-gray-50">
//                       <td className="py-3 px-4">{user.name}</td>
//                       <td className="py-3 px-4">{user.email}</td>
                      
//                       <td className="py-3 px-4">
//                         <button
//                           onClick={() => handleViewDetails(user)}
//                           className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                         >
//                           <Eye size={16} className="mr-1" />
//                           View Details
//                         </button>
//                       </td>
//                       <td className="py-3 px-4">{user.rejectReason || "N/A"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="py-6 text-center text-gray-500">
//                       No users found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Pagination Controls */}
//           {pageInfo.totalPages > 1 && (
//             <div className="flex justify-center items-center mt-6 space-x-2">
//               <button
//                 onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               >
//                 Previous
//               </button>
              
//               <div className="flex items-center space-x-1">
//                 {[...Array(pageInfo.totalPages)].map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handlePageChange(index + 1)}
//                     className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
              
//               <button
//                 onClick={() => handlePageChange(Math.min(pageInfo.totalPages, currentPage + 1))}
//                 disabled={currentPage === pageInfo.totalPages}
//                 className={`px-3 py-1 rounded ${currentPage === pageInfo.totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
     

//     </div>
//   );
// };

// export default RejectedList;



/// the most main code -------------RejectedList---------------



// import React, { useState, useEffect } from 'react';
// import { Eye } from 'lucide-react';
// import UnverfiedUserDetails from '../industiralUser/UnverfiedUserDetails'; // Import the component

// const RejectedList = () => {
//   const [users, setUsers] = useState([]);
//   const [pageInfo, setPageInfo] = useState({
//     totalRecords: 0,
//     totalPages: 0
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);

//   // Function to fetch data from API
//   const fetchData = async (page = 1, size = 3) => {
//     setLoading(true);
//     try {
//       // Get token from localStorage
//       const token = localStorage.getItem('jwt');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }
      
//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUnVerifiedRejectedList?pageNo=${page}&pageSize=${size}&status=false`, 
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
      
//       const result = await response.json();
      
//       if (result.status === 1) {
//         setUsers(result.data.Data);
//         setPageInfo(result.data.PageInfo);
//       } else {
//         throw new Error(result.message || 'Failed to fetch data');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(currentPage, pageSize);
//   }, [currentPage, pageSize]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleViewDetails = (user) => {
//     setSelectedUser(user);
//     setShowDetails(true);
//   };

//   const handleBackToList = () => {
//     setShowDetails(false);
//     setSelectedUser(null);
//   };

//   // If we're showing details, render the UnverfiedUserDetails component
//   if (showDetails && selectedUser) {
//     return (
//       <div className="relative  mt-16">
//         <button 
//           onClick={handleBackToList}
//           className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center  "
//         >
//           <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//           </svg>
//           Back to List
//         </button>
        
//         {/* Pass the userId prop to UnverfiedUserDetails */}
//         <UnverfiedUserDetails userId={selectedUser.userId} />
//       </div>
//     );
//   }

//   // Otherwise, render the list view
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Rejected Users</h1>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
//                   <th className="py-3 px-4 text-left font-semibold text-gray-700">Rejected Reason</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length > 0 ? (
//                   users.map(user => (
//                     <tr key={user.userId} className="border-t border-gray-200 hover:bg-gray-50">
//                       <td className="py-3 px-4">{user.name}</td>
//                       <td className="py-3 px-4">{user.email}</td>
//                       <td className="py-3 px-4">
//                         <button
//                           onClick={() => handleViewDetails(user.userId)}
//                           className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                         >
//                           <Eye size={16} className="mr-1" />
//                           View Details
//                         </button>
//                       </td>
//                       <td className="py-3 px-4">{user.rejectReason || "N/A"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="py-6 text-center text-gray-500">
//                       No users found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Pagination Controls */}
//           {pageInfo.totalPages > 1 && (
//             <div className="flex justify-center items-center mt-6 space-x-2">
//               <button
//                 onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               >
//                 Previous
//               </button>
              
//               <div className="flex items-center space-x-1">
//                 {[...Array(pageInfo.totalPages)].map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handlePageChange(index + 1)}
//                     className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
              
//               <button
//                 onClick={() => handlePageChange(Math.min(pageInfo.totalPages, currentPage + 1))}
//                 disabled={currentPage === pageInfo.totalPages}
//                 className={`px-3 py-1 rounded ${currentPage === pageInfo.totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default RejectedList;

















import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import UnverfiedUserDetailsData from '../verifieddata/UnverfiedUserDetailsData'; // Import the component

const RejectedList = () => {
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalRecords: 0,
    totalPages: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Function to fetch data from API
  const fetchData = async (page = 1, size = 3) => {
    setLoading(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('jwt');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllUnVerifiedRejectedList?pageNo=${page}&pageSize=${size}&status=false`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await response.json();
      
      if (result.status === 1) {
        setUsers(result.data.Data);
        setPageInfo(result.data.PageInfo);
      } else {
        throw new Error(result.message || 'Failed to fetch data');
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  // If we're showing details, render the UnverfiedUserDetails component
  if (showDetails && selectedUser) {
    return (
      <div className="relative  mt-16">
        <button 
          onClick={handleBackToList}
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center  "
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to List
        </button>
        
        {/* Pass the userId prop to UnverfiedUserDetails */}
        <UnverfiedUserDetailsData userId={selectedUser} />
      </div>
    );
  }

  // Otherwise, render the list view
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Rejected Users</h1>
      
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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Rejected Reason</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.userId} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <button
                           onClick={() => handleViewDetails(user.userId)}
                          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          <Eye size={16} className="mr-1" />
                          View Details
                        </button>
                      </td>
                      <td className="py-3 px-4">{user.rejectReason || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-6 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}    
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {pageInfo.totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {[...Array(pageInfo.totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(Math.min(pageInfo.totalPages, currentPage + 1))}
                disabled={currentPage === pageInfo.totalPages}
                className={`px-3 py-1 rounded ${currentPage === pageInfo.totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RejectedList;   