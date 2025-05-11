

/// search input containing code ----------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, AlertCircle, Search } from 'lucide-react';

// const UserTable = ({ startDate, endDate }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Get auth token from localStorage
//   const getAuthToken = () => {
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       setAuthError(true);
//       setError("Authentication token not found. Please log in again.");
//       return null;
//     }
//     return token;
//   };

//   const fetchUsers = async () => {
//     if (!startDate || !endDate) {
//       return;
//     }

//     const token = getAuthToken();
//     if (!token) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUsers?pageNo=${currentPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!response.ok) {
//         if (response.status === 401 || response.status === 403) {
//           setAuthError(true);
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (data.status === 1) {
//         setUsers(data.data.users);
//         setFilteredUsers(data.data.users);
//         setTotalUsers(data.data.totalUsers);
//         setTotalPages(data.data.totalPages);
//       } else {
//         throw new Error(data.message || "Failed to fetch users");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch users. Please try again.");
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchUsers();
//     }
//   }, [startDate, endDate, currentPage, pageSize]);

//   // Handle search functionality
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredUsers(users);
//     } else {
//       const query = searchQuery.toLowerCase().trim();
//       const filtered = users.filter(user => 
//         user.name?.toLowerCase().includes(query) || 
//         user.email?.toLowerCase().includes(query) || 
//         user.phoneNumber?.includes(query)
//       );
//       setFilteredUsers(filtered);
//     }
//   }, [searchQuery, users]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   const handlePageSizeChange = (e) => {
//     const newSize = parseInt(e.target.value);
//     setPageSize(newSize);
//     setCurrentPage(1); // Reset to first page when changing page size
//   };

//   const handleLogin = () => {
//     // Redirect to login page
//     window.location.href = '/login';
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total pages is less than max visible
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);
      
//       // Calculate start and end of middle section
//       let start = Math.max(2, currentPage - 1);
//       let end = Math.min(totalPages - 1, currentPage + 1);
      
//       // Adjust if at edges
//       if (currentPage <= 2) {
//         end = Math.min(totalPages - 1, 4);
//       } else if (currentPage >= totalPages - 1) {
//         start = Math.max(2, totalPages - 3);
//       }
      
//       // Add ellipsis if needed
//       if (start > 2) {
//         pages.push('...');
//       }
      
//       // Add middle pages
//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }
      
//       // Add ellipsis if needed
//       if (end < totalPages - 1) {
//         pages.push('...');
//       }
      
//       // Always show last page
//       pages.push(totalPages);
//     }
    
//     return pages;
//   };

//   if (!startDate || !endDate) {
//     return (
//       <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
//         <p>Please select both start and end dates to view user data.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">User Data</h2>
        
//         {/* Search Input */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search by name, email, phone..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//           />
//           <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
//         </div>
//       </div>
      
//       {/* Authentication Error */}
//       {authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//           <AlertCircle className="mr-2" size={20} />
//           <div>
//             <p className="font-medium">Authentication Error</p>
//             <p>Please log in to access the user data.</p>
//           </div>
//           <button 
//             onClick={handleLogin}
//             className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             Log In
//           </button>
//         </div>
//       )}
      
//       {/* Loading State */}
//       {loading && !authError && (
//         <div className="text-center py-4">
//           <p className="text-gray-600">Loading user data...</p>
//         </div>
//       )}
      
//       {/* Error State */}
//       {error && !authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//           <p>{error}</p>
//         </div>
//       )}
      
//       {/* User Data Table */}
//       {!loading && !error && !authError && (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-lg overflow-hidden">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">DOB</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User Type</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <tr key={user.userId} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.userId}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.name}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.phoneNumber}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700 capitalize">{user.gender}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.dob}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.userType}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
//                       No users found matching your search criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Pagination Controls */}
//           <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
//             <div className="mb-4 sm:mb-0">
//               <p className="text-sm text-gray-600">
//                 {searchQuery ? 
//                   `Showing ${filteredUsers.length} matching results` : 
//                   `Showing ${users.length} of ${totalUsers} users`
//                 }
//               </p>
//             </div>
            
//             {!searchQuery && (
//               <div className="flex items-center">
//                 <div className="mr-4">
//                   <select
//                     value={pageSize}
//                     onChange={handlePageSizeChange}
//                     className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="5">5 per page</option>
//                     <option value="10">10 per page</option>
//                     <option value="20">20 per page</option>
//                     <option value="50">50 per page</option>
//                   </select>
//                 </div>
                
//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`p-1 rounded-md ${
//                       currentPage === 1
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
                  
//                   {getPageNumbers().map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
//                       disabled={page === '...'}
//                       className={`px-3 py-1 rounded-md ${
//                         page === currentPage
//                           ? 'bg-blue-600 text-white'
//                           : page === '...'
//                           ? 'text-gray-600 cursor-default'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
                  
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`p-1 rounded-md ${
//                       currentPage === totalPages
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
      
//       {/* No Data State */}
//       {!loading && !error && !authError && users.length === 0 && filteredUsers.length === 0 && !searchQuery && (
//         <div className="text-center py-8">
//           <p className="text-gray-600">No user data found for the selected date range.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserTable;



////////////////  the most main main code working annd deployed code do npt miss it ------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, AlertCircle, Search } from 'lucide-react';
// import UnverfiedUserDetailsData from '../verifieddata/UnverfiedUserDetailsData'; // Import the user details component

// const UserTable = ({ startDate, endDate }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedUserId, setSelectedUserId] = useState(null); // Track the selected user ID
//   const [showUserDetails, setShowUserDetails] = useState(false); // Control whether to show user details

//   // Get auth token from localStorage
//   const getAuthToken = () => {
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       setAuthError(true);
//       setError("Authentication token not found. Please log in again.");
//       return null;
//     }
//     return token;
//   };

//   const fetchUsers = async () => {
//     if (!startDate || !endDate) {
//       return;
//     }

//     const token = getAuthToken();
//     if (!token) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUsers?pageNo=${currentPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!response.ok) {
//         if (response.status === 401 || response.status === 403) {
//           setAuthError(true);
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (data.status === 1) {
//         setUsers(data.data.users);
//         setFilteredUsers(data.data.users);
//         setTotalUsers(data.data.totalUsers);
//         setTotalPages(data.data.totalPages);
//       } else {
//         throw new Error(data.message || "Failed to fetch users");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch users. Please try again.");
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchUsers();
//     }
//   }, [startDate, endDate, currentPage, pageSize]);

//   // Handle search functionality
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredUsers(users);
//     } else {
//       const query = searchQuery.toLowerCase().trim();
//       const filtered = users.filter(user => 
//         user.name?.toLowerCase().includes(query) || 
//         user.email?.toLowerCase().includes(query) || 
//         user.phoneNumber?.includes(query)
//       );
//       setFilteredUsers(filtered);
//     }
//   }, [searchQuery, users]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   const handlePageSizeChange = (e) => {
//     const newSize = parseInt(e.target.value);
//     setPageSize(newSize);
//     setCurrentPage(1); // Reset to first page when changing page size
//   };

//   const handleLogin = () => {
//     // Redirect to login page
//     window.location.href = '/login';
//   };

//   // Handle user selection to view details
//   const handleUserSelect = (userId) => {
//     setSelectedUserId(userId);
//     setShowUserDetails(true);
//   };

//   // Handle back to user list
//   const handleBackToList = () => {
//     setShowUserDetails(false);
//     setSelectedUserId(null);
//   };

//   // Generate page numbers for pagination
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages if total pages is less than max visible
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);
      
//       // Calculate start and end of middle section
//       let start = Math.max(2, currentPage - 1);
//       let end = Math.min(totalPages - 1, currentPage + 1);
      
//       // Adjust if at edges
//       if (currentPage <= 2) {
//         end = Math.min(totalPages - 1, 4);
//       } else if (currentPage >= totalPages - 1) {
//         start = Math.max(2, totalPages - 3);
//       }
      
//       // Add ellipsis if needed
//       if (start > 2) {
//         pages.push('...');
//       }
      
//       // Add middle pages
//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }
      
//       // Add ellipsis if needed
//       if (end < totalPages - 1) {
//         pages.push('...');
//       }
      
//       // Always show last page
//       pages.push(totalPages);
//     }
    
//     return pages;
//   };

//   if (!startDate || !endDate) {
//     return (
//       <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
//         <p>Please select both start and end dates to view user data.</p>
//       </div>
//     );
//   }

//   // If user details should be shown, render the UnverfiedUserDetailsData component
//   if (showUserDetails && selectedUserId) {
//     return (
//       <div>
//         <button 
//           onClick={handleBackToList}
//           className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <ChevronLeft size={20} />
//           <span>Back to User List</span>
//         </button>
//         <UnverfiedUserDetailsData userId={selectedUserId} />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">User Data</h2>
        
//         {/* Search Input */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search by name, email, phone..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//           />
//           <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
//         </div>
//       </div>
      
//       {/* Authentication Error */}
//       {authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//           <AlertCircle className="mr-2" size={20} />
//           <div>
//             <p className="font-medium">Authentication Error</p>
//             <p>Please log in to access the user data.</p>
//           </div>
//           <button 
//             onClick={handleLogin}
//             className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             Log In
//           </button>
//         </div>
//       )}
      
//       {/* Loading State */}
//       {loading && !authError && (
//         <div className="text-center py-4">
//           <p className="text-gray-600">Loading user data...</p>
//         </div>
//       )}
      
//       {/* Error State */}
//       {error && !authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//           <p>{error}</p>
//         </div>
//       )}
      
//       {/* User Data Table */}
//       {!loading && !error && !authError && (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-lg overflow-hidden">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">DOB</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User Type</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <tr 
//                       key={user.userId} 
//                       className="hover:bg-gray-50 cursor-pointer" 
//                       onClick={() => handleUserSelect(user.userId)}
//                     >
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.userId}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700 font-medium text-blue-600 hover:text-blue-800">{user.name}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.phoneNumber}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700 capitalize">{user.gender}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.dob}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.userType}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
//                       No users found matching your search criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Pagination Controls */}
//           <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
//             <div className="mb-4 sm:mb-0">
//               <p className="text-sm text-gray-600">
//                 {searchQuery ? 
//                   `Showing ${filteredUsers.length} matching results` : 
//                   `Showing ${users.length} of ${totalUsers} users`
//                 }
//               </p>
//             </div>
            
//             {!searchQuery && (
//               <div className="flex items-center">
//                 <div className="mr-4">
//                   <select
//                     value={pageSize}
//                     onChange={handlePageSizeChange}
//                     className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="5">5 per page</option>
//                     <option value="10">10 per page</option>
//                     <option value="20">20 per page</option>
//                     <option value="50">50 per page</option>
//                   </select>
//                 </div>
                
//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`p-1 rounded-md ${
//                       currentPage === 1
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
                  
//                   {getPageNumbers().map((page, index) => (
//                     <button
//                       key={index}
//                       onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
//                       disabled={page === '...'}
//                       className={`px-3 py-1 rounded-md ${
//                         page === currentPage
//                           ? 'bg-blue-600 text-white'
//                           : page === '...'
//                           ? 'text-gray-600 cursor-default'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
                  
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`p-1 rounded-md ${
//                       currentPage === totalPages
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-600 hover:bg-gray-100'
//                     }`}
//                   >
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
      
//       {/* No Data State */}
//       {!loading && !error && !authError && users.length === 0 && filteredUsers.length === 0 && !searchQuery && (
//         <div className="text-center py-8">
//           <p className="text-gray-600">No user data found for the selected date range.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserTable;





////// pagination added code do not miss it -------------------------------------------


// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, AlertCircle, Search } from 'lucide-react';
// import UnverfiedUserDetailsData from '../verifieddata/UnverfiedUserDetailsData'; // Import the user details component

// const UserTable = ({ startDate, endDate }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedUserId, setSelectedUserId] = useState(null); // Track the selected user ID
//   const [showUserDetails, setShowUserDetails] = useState(false); // Control whether to show user details
//   const [selectKey, setSelectKey] = useState(0); // Add selectKey for resetting select component

//   // Get auth token from localStorage
//   const getAuthToken = () => {
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       setAuthError(true);
//       setError("Authentication token not found. Please log in again.");
//       return null;
//     }
//     return token;
//   };

//   const fetchUsers = async () => {
//     if (!startDate || !endDate) {
//       return;
//     }

//     const token = getAuthToken();
//     if (!token) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUsers?pageNo=${currentPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!response.ok) {
//         if (response.status === 401 || response.status === 403) {
//           setAuthError(true);
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (data.status === 1) {
//         setUsers(data.data.users);
//         setFilteredUsers(data.data.users);
//         setTotalUsers(data.data.totalUsers);
//         setTotalPages(data.data.totalPages);
//       } else {
//         throw new Error(data.message || "Failed to fetch users");
//       }
//     } catch (err) {
//       setError(err.message || "Failed to fetch users. Please try again.");
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchUsers();
//     }
//   }, [startDate, endDate, currentPage, pageSize]);

//   // Handle search functionality
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredUsers(users);
//     } else {
//       const query = searchQuery.toLowerCase().trim();
//       const filtered = users.filter(user => 
//         user.name?.toLowerCase().includes(query) || 
//         user.email?.toLowerCase().includes(query) || 
//         user.phoneNumber?.includes(query)
//       );
//       setFilteredUsers(filtered);
//     }
//   }, [searchQuery, users]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handlePageSizeChange = (e) => {
//     const newSize = parseInt(e.target.value);
//     setPageSize(newSize);
//     setCurrentPage(1); // Reset to first page when changing page size
//     setSelectKey(prevKey => prevKey + 1); // Update select key to force re-render
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleLogin = () => {
//     // Redirect to login page
//     window.location.href = '/login';
//   };

//   // Handle user selection to view details
//   const handleUserSelect = (userId) => {
//     setSelectedUserId(userId);
//     setShowUserDetails(true);
//   };

//   // Handle back to user list
//   const handleBackToList = () => {
//     setShowUserDetails(false);
//     setSelectedUserId(null);
//   };

//   if (!startDate || !endDate) {
//     return (
//       <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
//         <p>Please select both start and end dates to view user data.</p>
//       </div>
//     );
//   }

//   // If user details should be shown, render the UnverfiedUserDetailsData component
//   if (showUserDetails && selectedUserId) {
//     return (
//       <div>
//         <button 
//           onClick={handleBackToList}
//           className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <ChevronLeft size={20} />
//           <span>Back to User List</span>
//         </button>
//         <UnverfiedUserDetailsData userId={selectedUserId} />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">User Data</h2>
        
//         {/* Search Input */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search by name, email, phone..."
//             value={searchQuery}
//             onChange={handleSearch}
//             className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
//           />
//           <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
//         </div>
//       </div>
      
//       {/* Authentication Error */}
//       {authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//           <AlertCircle className="mr-2" size={20} />
//           <div>
//             <p className="font-medium">Authentication Error</p>
//             <p>Please log in to access the user data.</p>
//           </div>
//           <button 
//             onClick={handleLogin}
//             className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             Log In
//           </button>
//         </div>
//       )}
      
//       {/* Loading State */}
//       {loading && !authError && (
//         <div className="text-center py-4">
//           <p className="text-gray-600">Loading user data...</p>
//         </div>
//       )}
      
//       {/* Error State */}
//       {error && !authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//           <p>{error}</p>
//         </div>
//       )}
      
//       {/* User Data Table */}
//       {!loading && !error && !authError && (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-lg overflow-hidden">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">DOB</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User Type</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.map((user) => (
//                     <tr 
//                       key={user.userId} 
//                       className="hover:bg-gray-50 cursor-pointer" 
//                       onClick={() => handleUserSelect(user.userId)}
//                     >
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.userId}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700 font-medium text-blue-600 hover:text-blue-800">{user.name}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.phoneNumber}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700 capitalize">{user.gender}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.dob}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{user.userType}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
//                       No users found matching your search criteria.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* New Pagination Footer */}
//           {!searchQuery && (
//             <div className="flex justify-between items-center border-t border-gray-200 p-4 mt-1">
//               <div className="text-sm text-gray-600">
//                 Showing page {currentPage} of {totalPages}
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="w-18 h-8 flex items-center justify-center rounded-full border border-black">
//                   <select
//                     key={selectKey}
//                     value={pageSize}
//                     onChange={handlePageSizeChange}
//                     className="w-full h-full text-sm border-0 rounded-full px-2 focus:outline-none"
//                   >
//                     {[5, 10, 15, 20, 25].map((size) => (
//                       <option key={size} value={size} className="py-1 text-sm">
//                         {size}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <button
//                   size="sm"
//                   disabled={currentPage === 1}
//                   className="rounded-full border border-black px-4 py-1 text-sm disabled:opacity-50"
//                   onClick={handlePreviousPage}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   size="sm"
//                   disabled={currentPage === totalPages}
//                   className="rounded-full border border-black px-4 py-1 text-sm disabled:opacity-50"
//                   onClick={handleNextPage}
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
          
//           {/* No Data State */}
//           {users.length === 0 && filteredUsers.length === 0 && !searchQuery && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">No user data found for the selected date range.</p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default UserTable;










import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Search } from 'lucide-react';
import UnverfiedUserDetailsData from '../verifieddata/UnverfiedUserDetailsData'; // Import the industry user details component
import UnverfiedUserTable from './UnverfiedUserTable'; // Import the public user details component

const UserTable = ({ startDate, endDate }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // Track the selected user ID
  const [selectedUserType, setSelectedUserType] = useState(null); // Track the selected user type
  const [showUserDetails, setShowUserDetails] = useState(false); // Control whether to show user details
  const [selectKey, setSelectKey] = useState(0); // Add selectKey for resetting select component

  // Get auth token from localStorage
  const getAuthToken = () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setAuthError(true);
      setError("Authentication token not found. Please log in again.");
      return null;
    }
    return token;
  };

  const fetchUsers = async () => {
    if (!startDate || !endDate) {
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllUsers?pageNo=${currentPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
        { headers }
      );
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setAuthError(true);
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 1) {
        setUsers(data.data.users);
        setFilteredUsers(data.data.users);
        setTotalUsers(data.data.totalUsers);
        setTotalPages(data.data.totalPages);
      } else {
        throw new Error(data.message || "Failed to fetch users");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch users. Please try again.");
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchUsers();
    }
  }, [startDate, endDate, currentPage, pageSize]);

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = users.filter(user => 
        user.name?.toLowerCase().includes(query) || 
        user.email?.toLowerCase().includes(query) || 
        user.phoneNumber?.includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
    setSelectKey(prevKey => prevKey + 1); // Update select key to force re-render
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  // Handle user selection to view details
  const handleUserSelect = (userId, userType) => {
    setSelectedUserId(userId);
    setSelectedUserType(userType);
    setShowUserDetails(true);
  };

  // Handle back to user list
  const handleBackToList = () => {
    setShowUserDetails(false);
    setSelectedUserId(null);
    setSelectedUserType(null);
  };

  if (!startDate || !endDate) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
        <p>Please select both start and end dates to view user data.</p>
      </div>
    );
  }

  // If user details should be shown, render the appropriate component based on user type
  if (showUserDetails && selectedUserId) {
    return (
      <div>
        <button 
          onClick={handleBackToList}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to User List</span>
        </button>
        
        {selectedUserType === "Public User" ? (
          <UnverfiedUserTable userId={selectedUserId} />
        ) : (
          <UnverfiedUserDetailsData userId={selectedUserId} />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Data</h2>
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
        </div>
      </div>
      
      {/* Authentication Error */}
      {authError && (
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
      )}
      
      {/* Loading State */}
      {loading && !authError && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading user data...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && !authError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {/* User Data Table */}
      {!loading && !error && !authError && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">DOB</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">User Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr 
                      key={user.userId} 
                      className="hover:bg-gray-50 cursor-pointer" 
                      onClick={() => handleUserSelect(user.userId, user.userType)}
                    >
                      <td className="px-4 py-3 text-sm text-gray-700">{user.userId}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium text-blue-600 hover:text-blue-800">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.phoneNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 capitalize">{user.gender}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.dob}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.userType}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                      No users found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* New Pagination Footer */}
          {!searchQuery && (
            <div className="flex justify-between items-center border-t border-gray-200 p-4 mt-1">
              <div className="text-sm text-gray-600">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-4">
                <div className="w-18 h-8 flex items-center justify-center rounded-full border border-black">
                  <select
                    key={selectKey}
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="w-full h-full text-sm border-0 rounded-full px-2 focus:outline-none"
                  >
                    {[5, 10, 15, 20, 25].map((size) => (
                      <option key={size} value={size} className="py-1 text-sm">
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  size="sm"
                  disabled={currentPage === 1}
                  className="rounded-full border border-black px-4 py-1 text-sm disabled:opacity-50"
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
                <button
                  size="sm"
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-black px-4 py-1 text-sm disabled:opacity-50"
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {/* No Data State */}
          {users.length === 0 && filteredUsers.length === 0 && !searchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-600">No user data found for the selected date range.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserTable;
