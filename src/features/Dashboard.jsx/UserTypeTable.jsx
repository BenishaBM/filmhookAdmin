// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react';

// const UserTypeTable = ({ userType, startDate, endDate, onClose }) => {
//   const [users, setUsers] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);

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

//   const fetchUsersByType = async () => {
//     if (!startDate || !endDate || !userType) {
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
//         `https://www.filmhooks.annulartech.net/admin/getAllUsersByUserType?userType=${encodeURIComponent(userType)}&pageNo=${currentPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
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
//         setTotalUsers(data.data.totalUsers);
//         setTotalPages(data.data.totalPages);
//       } else {
//         throw new Error(data.message || `Failed to fetch ${userType} users`);
//       }
//     } catch (err) {
//       setError(err.message || `Failed to fetch ${userType} users. Please try again.`);
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (startDate && endDate && userType) {
//       fetchUsersByType();
//     }
//   }, [startDate, endDate, userType, currentPage, pageSize]);

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

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-semibold">{userType} Data</h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             <X size={24} />
//           </button>
//         </div>
        
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//           {/* Authentication Error */}
//           {authError && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//               <AlertCircle className="mr-2" size={20} />
//               <div>
//                 <p className="font-medium">Authentication Error</p>
//                 <p>Please log in to access the user data.</p>
//               </div>
//               <button 
//                 onClick={handleLogin}
//                 className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//               >
//                 Log In
//               </button>
//             </div>
//           )}
          
//           {/* Loading State */}
//           {loading && !authError && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">Loading {userType} data...</p>
//             </div>
//           )}
          
//           {/* Error State */}
//           {error && !authError && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//               <p>{error}</p>
//             </div>
//           )}
          
//           {/* User Data Table */}
//           {!loading && !error && !authError && users.length > 0 && (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white rounded-lg overflow-hidden">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">DOB</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Country</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {users.map((user) => (
//                       <tr key={user.userId} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.userId}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.name}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.phoneNumber}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700 capitalize">{user.gender}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.dob}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.country || '-'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               {/* Pagination Controls */}
//               <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
//                 <div className="mb-4 sm:mb-0">
//                   <p className="text-sm text-gray-600">
//                     Showing {users.length} of {totalUsers} {userType}s
//                   </p>
//                 </div>
                
//                 <div className="flex items-center">
//                   <div className="mr-4">
//                     <select
//                       value={pageSize}
//                       onChange={handlePageSizeChange}
//                       className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="5">5 per page</option>
//                       <option value="10">10 per page</option>
//                       <option value="20">20 per page</option>
//                       <option value="50">50 per page</option>
//                     </select>
//                   </div>
                  
//                   <div className="flex items-center space-x-1">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className={`p-1 rounded-md ${
//                         currentPage === 1
//                           ? 'text-gray-400 cursor-not-allowed'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       <ChevronLeft size={20} />
//                     </button>
                    
//                     {getPageNumbers().map((page, index) => (
//                       <button
//                         key={index}
//                         onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
//                         disabled={page === '...'}
//                         className={`px-3 py-1 rounded-md ${
//                           page === currentPage
//                             ? 'bg-blue-600 text-white'
//                             : page === '...'
//                             ? 'text-gray-600 cursor-default'
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
                    
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                       className={`p-1 rounded-md ${
//                         currentPage === totalPages
//                           ? 'text-gray-400 cursor-not-allowed'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       <ChevronRight size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
          
//           {/* No Data State */}
//           {!loading && !error && !authError && users.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">No {userType} data found for the selected date range.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserTypeTable;





















//// search input functionality code-----------------------------------------------------------



// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, AlertCircle, X, Search } from 'lucide-react';

// const UserTypeTable = ({ userType, startDate, endDate, onClose }) => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

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

//   const fetchUsersByType = async () => {
//     if (!startDate || !endDate || !userType) {
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
//         `https://www.filmhooks.annulartech.net/admin/getAllUsersByUserType?userType=${encodeURIComponent(userType)}&pageNo=${currentPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
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
//         setFilteredUsers(data.data.users); // Initialize filtered users with all users
//         setTotalUsers(data.data.totalUsers);
//         setTotalPages(data.data.totalPages);
//       } else {
//         throw new Error(data.message || `Failed to fetch ${userType} users`);
//       }
//     } catch (err) {
//       setError(err.message || `Failed to fetch ${userType} users. Please try again.`);
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (startDate && endDate && userType) {
//       fetchUsersByType();
//     }
//   }, [startDate, endDate, userType, currentPage, pageSize]);

//   // Filter users when search term changes
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredUsers(users);
//       return;
//     }

//     const term = searchTerm.toLowerCase().trim();
//     const filtered = users.filter(user => 
//       (user.name && user.name.toLowerCase().includes(term)) ||
//       (user.email && user.email.toLowerCase().includes(term)) ||
//       (user.phoneNumber && user.phoneNumber.includes(term))
//     );
    
//     setFilteredUsers(filtered);
//   }, [searchTerm, users]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     setSearchTerm(''); // Clear search when changing pages
//   };

//   const handlePageSizeChange = (e) => {
//     const newSize = parseInt(e.target.value);
//     setPageSize(newSize);
//     setCurrentPage(1); // Reset to first page when changing page size
//     setSearchTerm(''); // Clear search when changing page size
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

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-semibold">{userType} Data</h2>
//           <div className="flex items-center">
//             {/* Search Input in Header */}
//             {!loading && !error && !authError && users.length > 0 && (
//               <div className="relative mr-4 w-64">
//                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//                   <div className="pl-3 text-gray-400">
//                     <Search size={16} />
//                   </div>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     placeholder="Search name, email, phone..."
//                     className="w-full px-2 py-3 text-sm focus:outline-none"
//                   />
//                   {searchTerm && (
//                     <button 
//                       className="px-2 text-gray-400 hover:text-gray-600"
//                       onClick={() => setSearchTerm('')}
//                     >
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//                 {searchTerm && (
//                   <div className="absolute right-0 mt-1 text-xs text-gray-500">
//                     {filteredUsers.length} results
//                   </div>
//                 )}
//               </div>
//             )}
//             <button 
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <X size={24} />
//             </button>
//           </div>
//         </div>
        
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//           {/* Authentication Error */}
//           {authError && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//               <AlertCircle className="mr-2" size={20} />
//               <div>
//                 <p className="font-medium">Authentication Error</p>
//                 <p>Please log in to access the user data.</p>
//               </div>
//               <button 
//                 onClick={handleLogin}
//                 className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//               >
//                 Log In
//               </button>
//             </div>
//           )}
          
//           {/* Loading State */}
//           {loading && !authError && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">Loading {userType} data...</p>
//             </div>
//           )}
          
//           {/* Error State */}
//           {error && !authError && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//               <p>{error}</p>
//             </div>
//           )}
          
//           {/* User Data Table */}
//           {!loading && !error && !authError && users.length > 0 && (
//             <>
              
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white rounded-lg overflow-hidden">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">DOB</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Country</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {filteredUsers.map((user) => (
//                       <tr key={user.userId} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.userId}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.name}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.phoneNumber}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700 capitalize">{user.gender}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.dob}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{user.country || '-'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               {/* Show message when no search results */}
//               {filteredUsers.length === 0 && searchTerm && (
//                 <div className="text-center py-6">
//                   <p className="text-gray-600">No users found matching "{searchTerm}"</p>
//                 </div>
//               )}
              
//               {/* Pagination Controls - Only show when not searching */}
//               {!searchTerm && (
//                 <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
//                   <div className="mb-4 sm:mb-0">
//                     <p className="text-sm text-gray-600">
//                       Showing {users.length} of {totalUsers} {userType}s
//                     </p>
//                   </div>
                  
//                   <div className="flex items-center">
//                     <div className="mr-4">
//                       <select
//                         value={pageSize}
//                         onChange={handlePageSizeChange}
//                         className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="5">5 per page</option>
//                         <option value="10">10 per page</option>
//                         <option value="20">20 per page</option>
//                         <option value="50">50 per page</option>
//                       </select>
//                     </div>
                    
//                     <div className="flex items-center space-x-1">
//                       <button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className={`p-1 rounded-md ${
//                           currentPage === 1
//                             ? 'text-gray-400 cursor-not-allowed'
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         <ChevronLeft size={20} />
//                       </button>
                      
//                       {getPageNumbers().map((page, index) => (
//                         <button
//                           key={index}
//                           onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
//                           disabled={page === '...'}
//                           className={`px-3 py-1 rounded-md ${
//                             page === currentPage
//                               ? 'bg-blue-600 text-white'
//                               : page === '...'
//                               ? 'text-gray-600 cursor-default'
//                               : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       ))}
                      
//                       <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className={`p-1 rounded-md ${
//                           currentPage === totalPages
//                             ? 'text-gray-400 cursor-not-allowed'
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         <ChevronRight size={20} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
          
//           {/* No Data State */}
//           {!loading && !error && !authError && users.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-600">No {userType} data found for the selected date range.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserTypeTable;

















import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, X, Search } from 'lucide-react';
import UnverfiedUserDetailsData from '../verifieddata/UnverfiedUserDetailsData';

const UserTypeTable = ({ userType, startDate, endDate, onClose }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // Track the selected user ID
  const [showUserDetails, setShowUserDetails] = useState(false); // Control whether to show user details

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

  const fetchUsersByType = async () => {
    if (!startDate || !endDate || !userType) {
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
        `https://www.filmhooks.annulartech.net/admin/getAllUsersByUserType?userType=${encodeURIComponent(userType)}&pageNo=${currentPage}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
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
        setFilteredUsers(data.data.users); // Initialize filtered users with all users
        setTotalUsers(data.data.totalUsers);
        setTotalPages(data.data.totalPages);
      } else {
        throw new Error(data.message || `Failed to fetch ${userType} users`);
      }
    } catch (err) {
      setError(err.message || `Failed to fetch ${userType} users. Please try again.`);
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate && userType) {
      fetchUsersByType();
    }
  }, [startDate, endDate, userType, currentPage, pageSize]);

  // Filter users when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = users.filter(user => 
      (user.name && user.name.toLowerCase().includes(term)) ||
      (user.email && user.email.toLowerCase().includes(term)) ||
      (user.phoneNumber && user.phoneNumber.includes(term))
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setShowUserDetails(true);
  };

  const handleBackToList = () => {
    setShowUserDetails(false);
    setSelectedUserId(null);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setSearchTerm(''); // Clear search when changing pages
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
    setSearchTerm(''); // Clear search when changing page size
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at edges
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{userType} Data</h2>
          <div className="flex items-center">
            {/* Search Input in Header */}
            {!loading && !error && !authError && users.length > 0 && !showUserDetails && (
              <div className="relative mr-4 w-64">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                  <div className="pl-3 text-gray-400">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search name, email, phone..."
                    className="w-full px-2 py-3 text-sm focus:outline-none"
                  />
                  {searchTerm && (
                    <button 
                      className="px-2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchTerm('')}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div className="absolute right-0 mt-1 text-xs text-gray-500">
                    {filteredUsers.length} results
                  </div>
                )}
              </div>
            )}
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* User Details View */}
          {showUserDetails && selectedUserId && (
            <div className="mb-6">
              <button 
                onClick={handleBackToList}
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>Back to User List</span>
              </button>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">User Details</h3>
                <UnverfiedUserDetailsData userId={selectedUserId} />
              </div>
            </div>
          )}
          
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
          {loading && !authError && !showUserDetails && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading {userType} data...</p>
            </div>
          )}
          
          {/* Error State */}
          {error && !authError && !showUserDetails && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}
          
          {/* User Data Table - Only show when not viewing user details */}
          {!loading && !error && !authError && users.length > 0 && !showUserDetails && (
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
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Country</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr 
                        key={user.userId} 
                        className="hover:bg-gray-50 cursor-pointer" 
                        onClick={() => handleUserSelect(user.userId)}
                      >
                        <td className="px-4 py-3 text-sm text-gray-700">{user.userId}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{user.phoneNumber}</td>
                        <td className="px-4 py-3 text-sm text-gray-700 capitalize">{user.gender}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{user.dob}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{user.country || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Show message when no search results */}
              {filteredUsers.length === 0 && searchTerm && (
                <div className="text-center py-6">
                  <p className="text-gray-600">No users found matching "{searchTerm}"</p>
                </div>
              )}
              
              {/* Pagination Controls - Only show when not searching */}
              {!searchTerm && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-sm text-gray-600">
                      Showing {users.length} of {totalUsers} {userType}s
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-4">
                      <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-1 rounded-md ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      
                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                          disabled={page === '...'}
                          className={`px-3 py-1 rounded-md ${
                            page === currentPage
                              ? 'bg-blue-600 text-white'
                              : page === '...'
                              ? 'text-gray-600 cursor-default'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-1 rounded-md ${
                          currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          {/* No Data State */}
          {!loading && !error && !authError && users.length === 0 && !showUserDetails && (
            <div className="text-center py-8">
              <p className="text-gray-600">No {userType} data found for the selected date range.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTypeTable;