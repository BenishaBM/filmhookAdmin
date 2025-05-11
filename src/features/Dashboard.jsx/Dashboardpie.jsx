// import React, { useState, useEffect } from 'react';
// import { Calendar, ChevronDown, AlertCircle } from 'lucide-react';
// import { 
//   BarChart, 
//   Bar, 
//   PieChart, 
//   Pie, 
//   Cell, 
//   LineChart, 
//   Line,
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   ResponsiveContainer 
// } from 'recharts';

// const Dashboardpie = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [postData, setPostData] = useState(null);
//   const [paymentData, setPaymentData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);

//   // Colors for charts
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

//   // Format data for pie charts
//   const formatUserData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'Industry Users', value: data.industryUserCount },
//       { name: 'Public Users', value: data.publicUserCount }
//     ];
//   };

//   const formatPostData = (data) => {
//     if (!data) return [];
//     return [
//       // { name: 'Active Reports', value: data.activeReportCount },
//       // { name: 'Inactive Reports', value: data.inactiveReportCount },
//       { name: 'Total Posts', value: data.totalPostCount },
//       { name: 'Total Posts', value: data.totalReportCount }
//     ];
//   };

//   const formatPaymentData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'SUCCESS', value: data.SUCCESS || 0 },
//       { name: 'FAILED', value: data.FAILED || 0 },
//       { name: 'EXPIRED', value: data.EXPIRED || 0 },
//       { name: 'PENDING', value: data.PENDING || 0 }
//     ];
//   };

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

//   const fetchData = async () => {
//     if (!startDate || !endDate) {
//       return;
//     }

//     const token = getAuthToken();
//     if (!token) return;

//     setLoading(true);
//     setError(null);
//     setAuthError(false);

//     try {
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       // Fetch users data
//       const usersResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUsersManagerCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!usersResponse.ok) {
//         if (usersResponse.status === 401 || usersResponse.status === 403) {
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${usersResponse.status}`);
//       }
      
//       const usersData = await usersResponse.json();
      
//       // Fetch posts data
//       const postsResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllReportPostCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!postsResponse.ok) {
//         throw new Error(`Server responded with status: ${postsResponse.status}`);
//       }
      
//       const postsData = await postsResponse.json();
      
//       // Fetch payment data
//       const paymentResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllPaymentStatusCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!paymentResponse.ok) {
//         throw new Error(`Server responded with status: ${paymentResponse.status}`);
//       }
      
//       const paymentData = await paymentResponse.json();

//       // Update state with fetched data
//       if (usersData.status === 1) setUserData(usersData.data);
//       if (postsData.status === 1) setPostData(postsData.data);
//       if (paymentData.status === 1) setPaymentData(paymentData.data);
      
//     } catch (err) {
//       if (err.message.includes('Authentication failed')) {
//         setAuthError(true);
//         // Clear the invalid token
//         localStorage.removeItem('authToken');
//       }
//       setError(err.message || "Failed to fetch data. Please try again.");
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Check for token on component mount
//     getAuthToken();
    
//     if (startDate && endDate) {
//       fetchData();
//     }
//   }, [startDate, endDate]);

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleLogin = () => {
//     // Redirect to login page
//     window.location.href = '/login';
//   };

//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill="white" 
//         textAnchor={x > cx ? 'start' : 'end'} 
//         dominantBaseline="central"
//       >
//         {`${name}: ${value}`}
//       </text>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>
      
//       {/* Authentication Error */}
//       {authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//           <AlertCircle className="mr-2" size={20} />
//           <div>
//             <p className="font-medium">Authentication Error</p>
//             <p>Please log in to access the dashboard.</p>
//           </div>
//           <button 
//             onClick={handleLogin}
//             className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             Log In
//           </button>
//         </div>
//       )}
      
//       {/* Date Range Selector */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-lg font-semibold mb-4 flex items-center">
//           <Calendar className="mr-2" size={20} />
//           Select Date Range
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={handleStartDateChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={authError}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={handleEndDateChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={authError}
//             />
//           </div>
//         </div>
        
//         <button 
//           onClick={fetchData}
//           className={`${
//             authError 
//               ? 'bg-gray-400 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-700'
//           } text-white px-4 py-2 rounded-md transition duration-300 flex items-center`}
//           disabled={authError}
//         >
//           Update Dashboard
//           <ChevronDown className="ml-1" size={16} />
//         </button>
//       </div>

//       {/* Loading and Error States */}
//       {loading && !authError && (
//         <div className="text-center py-4">
//           <p className="text-gray-600">Loading data...</p>
//         </div>
//       )}
      
//       {error && !authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Charts Section */}
//       {!loading && !error && !authError && (startDate && endDate) && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* User Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">User Distribution</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Users: {userData?.totalUserCount || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={formatUserData(userData)}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {formatUserData(userData).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Posts Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">Posts & Reports</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Reports: {postData?.totalReportCount || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={formatPostData(postData)}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Payment Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">Payment Status</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Payments: {paymentData?.total || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={formatPaymentData(paymentData)}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {formatPaymentData(paymentData).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* No Data Selected State */}
//       {!startDate || !endDate ? (
//         <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
//           <p>Please select both start and end dates to view analytics data.</p>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Dashboardpie;


/// the most main working code--------------


// import React, { useState, useEffect } from 'react';
// import { Calendar, ChevronDown, AlertCircle, X } from 'lucide-react';
// import { 
//   BarChart, 
//   Bar, 
//   PieChart, 
//   Pie, 
//   Cell, 
//   LineChart, 
//   Line,
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   ResponsiveContainer 
// } from 'recharts';
// import UserTable from './UserTable'; // General User Table component
// import UserTypeTable from './UserTypeTable'; // New component for user type filtering

// const Dashboardpie = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [postData, setPostData] = useState(null);
//   const [paymentData, setPaymentData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);
//   const [showUserTable, setShowUserTable] = useState(false); // General user table
//   const [selectedUserType, setSelectedUserType] = useState(null); // To track which user type is selected

//   // Colors for charts
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

//   // Format data for pie charts
//   const formatUserData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'Industry Users', value: data.industryUserCount, userType: 'Industry User' },
//       { name: 'Public Users', value: data.publicUserCount, userType: 'Public User' }
//     ];
//   };

//   const formatPostData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'Total Posts', value: data.totalPostCount },
//       { name: 'Total Reports', value: data.totalReportCount }
//     ];
//   };

//   const formatPaymentData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'SUCCESS', value: data.SUCCESS || 0 },
//       { name: 'FAILED', value: data.FAILED || 0 },
//       { name: 'EXPIRED', value: data.EXPIRED || 0 },
//       { name: 'PENDING', value: data.PENDING || 0 }
//     ];
//   };

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

//   const fetchData = async () => {
//     if (!startDate || !endDate) {
//       return;
//     }

//     const token = getAuthToken();
//     if (!token) return;

//     setLoading(true);
//     setError(null);
//     setAuthError(false);

//     try {
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       // Fetch users data
//       const usersResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUsersManagerCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!usersResponse.ok) {
//         if (usersResponse.status === 401 || usersResponse.status === 403) {
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${usersResponse.status}`);
//       }
      
//       const usersData = await usersResponse.json();
      
//       // Fetch posts data
//       const postsResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllReportPostCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!postsResponse.ok) {
//         throw new Error(`Server responded with status: ${postsResponse.status}`);
//       }
      
//       const postsData = await postsResponse.json();
      
//       // Fetch payment data
//       const paymentResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllPaymentStatusCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!paymentResponse.ok) {
//         throw new Error(`Server responded with status: ${paymentResponse.status}`);
//       }
      
//       const paymentData = await paymentResponse.json();

//       // Update state with fetched data
//       if (usersData.status === 1) setUserData(usersData.data);
//       if (postsData.status === 1) setPostData(postsData.data);
//       if (paymentData.status === 1) setPaymentData(paymentData.data);
      
//     } catch (err) {
//       if (err.message.includes('Authentication failed')) {
//         setAuthError(true);
//         // Clear the invalid token
//         localStorage.removeItem('jwt');
//       }
//       setError(err.message || "Failed to fetch data. Please try again.");
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Check for token on component mount
//     getAuthToken();
    
//     if (startDate && endDate) {
//       fetchData();
//     }
//   }, [startDate, endDate]);

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleLogin = () => {
//     // Redirect to login page
//     window.location.href = '/login';
//   };

//   // Handle click on User Distribution chart to show the general user table
//   const handleUserChartClick = () => {
//     setShowUserTable(!showUserTable);
//     setSelectedUserType(null); // Close any open user type table
//   };

//   // Handle click on a specific user type in the pie chart
//   const handlePieClick = (data, index) => {
//     if (data && data.userType) {
//       setSelectedUserType(data.userType);
//       setShowUserTable(false); // Close general user table if open
//     }
//   };

//   const handleCloseUserTableModal = () => {
//     setShowUserTable(false);
//   };

//   // Close the user type modal
//   const handleCloseUserTypeModal = () => {
//     setSelectedUserType(null);
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       setShowUserTable(false);
//       setSelectedUserType(null);
//     }
//   };


//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill="white" 
//         textAnchor={x > cx ? 'start' : 'end'} 
//         dominantBaseline="central"
//       >
//         {`${name}: ${value}`}
//       </text>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>
      
//       {/* Authentication Error */}
//       {authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//           <AlertCircle className="mr-2" size={20} />
//           <div>
//             <p className="font-medium">Authentication Error</p>
//             <p>Please log in to access the dashboard.</p>
//           </div>
//           <button 
//             onClick={handleLogin}
//             className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             Log In
//           </button>
//         </div>
//       )}
      
//       {/* Date Range Selector */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-lg font-semibold mb-4 flex items-center">
//           <Calendar className="mr-2" size={20} />
//           Select Date Range
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={handleStartDateChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={authError}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={handleEndDateChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={authError}
//             />
//           </div>
//         </div>
        
//         <button 
//           onClick={fetchData}
//           className={`${
//             authError 
//               ? 'bg-gray-400 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-700'
//           } text-white px-4 py-2 rounded-md transition duration-300 flex items-center`}
//           disabled={authError}
//         >
//           Update Dashboard
//           <ChevronDown className="ml-1" size={16} />
//         </button>
//       </div>

//       {/* Loading and Error States */}
//       {loading && !authError && (
//         <div className="text-center py-4">
//           <p className="text-gray-600">Loading data...</p>
//         </div>
//       )}
      
//       {error && !authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Charts Section */}
//       {!loading && !error && !authError && (startDate && endDate) && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* User Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">User Distribution</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Users: {userData?.totalUserCount || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={formatUserData(userData)}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     onClick={handlePieClick}
//                     cursor="pointer"
//                   >
//                     {formatUserData(userData).map((entry, index) => (
//                       <Cell 
//                         key={`cell-${index}`} 
//                         fill={COLORS[index % COLORS.length]} 
//                         className="hover:opacity-80"
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend 
//                     onClick={(data) => handlePieClick(data, data.dataKey)}
//                     cursor="pointer"
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="text-center mt-2">
//               <button
//                 onClick={handleUserChartClick}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//               >
//                 {showUserTable ? 'Hide All Users' : 'Total User'}
//               </button>
//             </div>
//           </div>

//           {/* Posts Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">Posts & Reports</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Reports: {postData?.totalReportCount || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={formatPostData(postData)}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Payment Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">Payment Status</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Payments: {paymentData?.total || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={formatPaymentData(paymentData)}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {formatPaymentData(paymentData).map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* No Data Selected State */}
//       {!startDate || !endDate ? (
//         <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
//           <p>Please select both start and end dates to view analytics data.</p>
//         </div>
//       ) : null}

//       {/* User Table Component (All Users) */}
//       {showUserTable && startDate && endDate && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//           onClick={handleBackdropClick}
//         >
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
//             <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
//               <button 
//                 onClick={handleCloseUserTableModal}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-4">
//               <UserTable startDate={startDate} endDate={endDate} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Type Table Modal (Industry or Public Users) */}
//       {selectedUserType && startDate && endDate && (
//         <UserTypeTable 
//           userType={selectedUserType}
//           startDate={startDate}
//           endDate={endDate}
//           onClose={handleCloseUserTypeModal}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboardpie;







/////////// the final working code-------------------------------------------------------


// import React, { useState, useEffect } from 'react';
// import { Calendar, ChevronDown, AlertCircle, X } from 'lucide-react';
// import { 
//   BarChart, 
//   Bar, 
//   PieChart, 
//   Pie, 
//   Cell, 
//   LineChart, 
//   Line,
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   ResponsiveContainer 
// } from 'recharts';
// import UserTable from './UserTable'; // General User Table component
// import UserTypeTable from './UserTypeTable'; // Component for user type filtering
// import PaymentStatusTable from './PaymentStatusTable'; // New component for payment status details

// const Dashboardpie = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [postData, setPostData] = useState(null);
//   const [paymentData, setPaymentData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);
//   const [showUserTable, setShowUserTable] = useState(false); // General user table
//   const [selectedUserType, setSelectedUserType] = useState(null); // To track which user type is selected
//   const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null); // To track which payment status is selected

//   // Colors for charts
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

//   // Format data for pie charts
//   const formatUserData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'Industry Users', value: data.industryUserCount, userType: 'Industry User' },
//       { name: 'Public Users', value: data.publicUserCount, userType: 'Public User' }
//     ];
//   };

//   const formatPostData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'Total Posts', value: data.totalPostCount },
//       { name: 'Total Reports', value: data.totalReportCount }
//     ];
//   };

//   const formatPaymentData = (data) => {
//     if (!data) return [];
//     return [
//       { name: 'SUCCESS', value: data.SUCCESS || 0, status: 'SUCCESS' },
//       { name: 'FAILED', value: data.FAILED || 0, status: 'FAILED' },
//       { name: 'EXPIRED', value: data.EXPIRED || 0, status: 'EXPIRED' },
//       { name: 'PENDING', value: data.PENDING || 0, status: 'PENDING' }
//     ];
//   };

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

//   const fetchData = async () => {
//     if (!startDate || !endDate) {
//       return;
//     }

//     const token = getAuthToken();
//     if (!token) return;

//     setLoading(true);
//     setError(null);
//     setAuthError(false);

//     try {
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       // Fetch users data
//       const usersResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllUsersManagerCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!usersResponse.ok) {
//         if (usersResponse.status === 401 || usersResponse.status === 403) {
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${usersResponse.status}`);
//       }
      
//       const usersData = await usersResponse.json();
      
//       // Fetch posts data
//       const postsResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllReportPostCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!postsResponse.ok) {
//         throw new Error(`Server responded with status: ${postsResponse.status}`);
//       }
      
//       const postsData = await postsResponse.json();
      
//       // Fetch payment data
//       const paymentResponse = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllPaymentStatusCount?startDate=${startDate}&endDate=${endDate}`,
//         { headers }
//       );
      
//       if (!paymentResponse.ok) {
//         throw new Error(`Server responded with status: ${paymentResponse.status}`);
//       }
      
//       const paymentData = await paymentResponse.json();

//       // Update state with fetched data
//       if (usersData.status === 1) setUserData(usersData.data);
//       if (postsData.status === 1) setPostData(postsData.data);
//       if (paymentData.status === 1) setPaymentData(paymentData.data);
      
//     } catch (err) {
//       if (err.message.includes('Authentication failed')) {
//         setAuthError(true);
//         // Clear the invalid token
//         localStorage.removeItem('jwt');
//       }
//       setError(err.message || "Failed to fetch data. Please try again.");
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Check for token on component mount
//     getAuthToken();
    
//     if (startDate && endDate) {
//       fetchData();
//     }
//   }, [startDate, endDate]);

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleLogin = () => {
//     // Redirect to login page
//     window.location.href = '/login';
//   };

//   // Handle click on User Distribution chart to show the general user table
//   const handleUserChartClick = () => {
//     setShowUserTable(!showUserTable);
//     setSelectedUserType(null); // Close any open user type table
//     setSelectedPaymentStatus(null); // Close any open payment status table
//   };

//   // Handle click on a specific user type in the pie chart
//   const handlePieClick = (data, index) => {
//     if (data && data.userType) {
//       setSelectedUserType(data.userType);
//       setShowUserTable(false); // Close general user table if open
//       setSelectedPaymentStatus(null); // Close any open payment status table
//     }
//   };

//   // Handle click on a payment status in the pie chart
//   const handlePaymentStatusClick = (data) => {
//     if (data && data.status) {
//       setSelectedPaymentStatus(data.status);
//       setShowUserTable(false); // Close general user table if open
//       setSelectedUserType(null); // Close any open user type table
//     }
//   };

//   const handleCloseUserTableModal = () => {
//     setShowUserTable(false);
//   };

//   // Close the user type modal
//   const handleCloseUserTypeModal = () => {
//     setSelectedUserType(null);
//   };

//   // Close the payment status modal
//   const handleClosePaymentStatusModal = () => {
//     setSelectedPaymentStatus(null);
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       setShowUserTable(false);
//       setSelectedUserType(null);
//       setSelectedPaymentStatus(null);
//     }
//   };

//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill="white" 
//         textAnchor={x > cx ? 'start' : 'end'} 
//         dominantBaseline="central"
//       >
//         {`${name}: ${value}`}
//       </text>
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>
      
//       {/* Authentication Error */}
//       {authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
//           <AlertCircle className="mr-2" size={20} />
//           <div>
//             <p className="font-medium">Authentication Error</p>
//             <p>Please log in to access the dashboard.</p>
//           </div>
//           <button 
//             onClick={handleLogin}
//             className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//           >
//             Log In
//           </button>
//         </div>
//       )}
      
//       {/* Date Range Selector */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-lg font-semibold mb-4 flex items-center">
//           <Calendar className="mr-2" size={20} />
//           Select Date Range
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={handleStartDateChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={authError}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={handleEndDateChange}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={authError}
//             />
//           </div>
//         </div>
        
//         <button 
//           onClick={fetchData}
//           className={`${
//             authError 
//               ? 'bg-gray-400 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-700'
//           } text-white px-4 py-2 rounded-md transition duration-300 flex items-center`}
//           disabled={authError}
//         >
//           Search
//           <ChevronDown className="ml-1" size={16} />
//         </button>
//       </div>

//       {/* Loading and Error States */}
//       {loading && !authError && (
//         <div className="text-center py-4">
//           <p className="text-gray-600">Loading data...</p>
//         </div>
//       )}
      
//       {error && !authError && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Charts Section */}
//       {!loading && !error && !authError && (startDate && endDate) && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* User Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">User Distribution</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Users: {userData?.totalUserCount || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={formatUserData(userData)}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     onClick={handlePieClick}
//                     cursor="pointer"
//                   >
//                     {formatUserData(userData).map((entry, index) => (
//                       <Cell 
//                         key={`cell-${index}`} 
//                         fill={COLORS[index % COLORS.length]} 
//                         className="hover:opacity-80"
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend 
//                     onClick={(data) => handlePieClick(data, data.dataKey)}
//                     cursor="pointer"
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="text-center mt-2">
//               <button
//                 onClick={handleUserChartClick}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//               >
//                 {showUserTable ? 'Hide All Users' : 'Show All Users'}
//               </button>
//             </div>
//           </div>

//           {/* Posts Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800"> Reports</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Reports: {postData?.totalReportCount || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={formatPostData(postData)}
//                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Payment Data Chart */}
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">Payment Status</h3>
//             <div className="text-sm text-gray-500 mb-4">
//               Total Payments: {paymentData?.total || 0}
//             </div>
            
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={formatPaymentData(paymentData)}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     onClick={handlePaymentStatusClick}
//                     cursor="pointer"
//                   >
//                     {formatPaymentData(paymentData).map((entry, index) => (
//                       <Cell 
//                         key={`cell-${index}`} 
//                         fill={COLORS[index % COLORS.length]} 
//                         className="hover:opacity-80"
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend 
//                     onClick={(entry) => {
//                       // Find the corresponding data entry for this legend item
//                       const data = formatPaymentData(paymentData).find(item => item.name === entry.value);
//                       handlePaymentStatusClick(data);
//                     }}
//                     cursor="pointer"
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="text-center mt-2">
              
//             </div>
//           </div>
//         </div>
//       )}

//       {/* No Data Selected State */}
//       {!startDate || !endDate ? (
//         <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
//           <p>Please select both start and end dates to view analytics data.</p>
//         </div>
//       ) : null}

//       {/* User Table Component (All Users) */}
//       {showUserTable && startDate && endDate && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//           onClick={handleBackdropClick}
//         >
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
//             <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
//               <button 
//                 onClick={handleCloseUserTableModal}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-4">
//               <UserTable startDate={startDate} endDate={endDate} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Type Table Modal (Industry or Public Users) */}
//       {selectedUserType && startDate && endDate && (
//         <UserTypeTable 
//           userType={selectedUserType}
//           startDate={startDate}
//           endDate={endDate}
//           onClose={handleCloseUserTypeModal}
//         />
//       )}

//       {/* Payment Status Table Modal */}
//       {selectedPaymentStatus && startDate && endDate && (
//         <PaymentStatusTable 
//           status={selectedPaymentStatus}
//           startDate={startDate}
//           endDate={endDate}
//           onClose={handleClosePaymentStatusModal}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboardpie;













import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, AlertCircle, X } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import UserTable from './UserTable'; // General User Table component
import UserTypeTable from './UserTypeTable'; // Component for user type filtering
import PaymentStatusTable from './PaymentStatusTable'; // New component for payment status details

const Dashboardpie = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false); // General user table
  const [selectedUserType, setSelectedUserType] = useState(null); // To track which user type is selected
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null); // To track which payment status is selected

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Format data for pie charts
  const formatUserData = (data) => {
    if (!data) return [];
    return [
      { name: 'Industry Users', value: data.industryUserCount, userType: 'Industry User' },
      { name: 'Public Users', value: data.publicUserCount, userType: 'Public User' }
    ];
  };

  const formatPostData = (data) => {
    if (!data) return [];
    return [
      { name: 'Total Posts', value: data.totalPostCount },
      { name: 'Total Reports', value: data.totalReportCount }
    ];
  };

  const formatPaymentData = (data) => {
    if (!data) return [];
    return [
      { name: 'SUCCESS', value: data.SUCCESS || 0, status: 'SUCCESS' },
      { name: 'FAILED', value: data.FAILED || 0, status: 'FAILED' },
      { name: 'EXPIRED', value: data.EXPIRED || 0, status: 'EXPIRED' },
      { name: 'PENDING', value: data.PENDING || 0, status: 'PENDING' }
    ];
  };

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

  const fetchData = async () => {
    if (!startDate || !endDate) {
      return;
    }

    const token = getAuthToken();
    if (!token) return;

    setLoading(true);
    setError(null);
    setAuthError(false);

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch users data
      const usersResponse = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllUsersManagerCount?startDate=${startDate}&endDate=${endDate}`,
        { headers }
      );
      
      if (!usersResponse.ok) {
        if (usersResponse.status === 401 || usersResponse.status === 403) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Server responded with status: ${usersResponse.status}`);
      }
      
      const usersData = await usersResponse.json();
      
      // Fetch posts data
      const postsResponse = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllReportPostCount?startDate=${startDate}&endDate=${endDate}`,
        { headers }
      );
      
      if (!postsResponse.ok) {
        throw new Error(`Server responded with status: ${postsResponse.status}`);
      }
      
      const postsData = await postsResponse.json();
      
      // Fetch payment data
      const paymentResponse = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllPaymentStatusCount?startDate=${startDate}&endDate=${endDate}`,
        { headers }
      );
      
      if (!paymentResponse.ok) {
        throw new Error(`Server responded with status: ${paymentResponse.status}`);
      }
      
      const paymentData = await paymentResponse.json();

      // Update state with fetched data
      if (usersData.status === 1) setUserData(usersData.data);
      if (postsData.status === 1) setPostData(postsData.data);
      if (paymentData.status === 1) setPaymentData(paymentData.data);
      
    } catch (err) {
      if (err.message.includes('Authentication failed')) {
        setAuthError(true);
        // Clear the invalid token
        localStorage.removeItem('jwt');
      }
      setError(err.message || "Failed to fetch data. Please try again.");
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for token on component mount
    getAuthToken();
    
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  // Handle click on User Distribution chart to show the general user table
  const handleUserChartClick = () => {
    setShowUserTable(!showUserTable);
    setSelectedUserType(null); // Close any open user type table
    setSelectedPaymentStatus(null); // Close any open payment status table
  };

  // Handle click on a specific user type in the pie chart
  const handlePieClick = (data, index) => {
    if (data && data.userType) {
      setSelectedUserType(data.userType);
      setShowUserTable(false); // Close general user table if open
      setSelectedPaymentStatus(null); // Close any open payment status table
    }
  };

  // Handle click on a payment status in the pie chart
  const handlePaymentStatusClick = (data) => {
    if (data && data.status) {
      setSelectedPaymentStatus(data.status);
      setShowUserTable(false); // Close general user table if open
      setSelectedUserType(null); // Close any open user type table
    }
  };

  const handleCloseUserTableModal = () => {
    setShowUserTable(false);
  };

  // Close the user type modal
  const handleCloseUserTypeModal = () => {
    setSelectedUserType(null);
  };

  // Close the payment status modal
  const handleClosePaymentStatusModal = () => {
    setSelectedPaymentStatus(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowUserTable(false);
      setSelectedUserType(null);
      setSelectedPaymentStatus(null);
    }
  };

  // Custom label function that only shows values without text
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${value}`}
      </text>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>
      
      {/* Authentication Error */}
      {authError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center">
          <AlertCircle className="mr-2" size={20} />
          <div>
            <p className="font-medium">Authentication Error</p>
            <p>Please log in to access the dashboard.</p>
          </div>
          <button 
            onClick={handleLogin}
            className="ml-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Log In
          </button>
        </div>
      )}
      
      {/* Date Range Selector */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="mr-2" size={20} />
          Select Date Range
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={authError}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={authError}
            />
          </div>
        </div>
        
        <button 
          onClick={fetchData}
          className={`${
            authError 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-4 py-2 rounded-md transition duration-300 flex items-center`}
          disabled={authError}
        >
          Search
          <ChevronDown className="ml-1" size={16} />
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && !authError && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading data...</p>
        </div>
      )}
      
      {error && !authError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Charts Section */}
      {!loading && !error && !authError && (startDate && endDate) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Data Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">User Distribution</h3>
            <div className="text-sm text-gray-500 mb-4">
              Total Users: {userData?.totalUserCount || 0}
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formatUserData(userData)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={handlePieClick}
                    cursor="pointer"
                  >
                    {formatUserData(userData).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        className="hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Color Legend for User Chart */}
            <div className="flex justify-center mt-4 flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                <span className="text-sm">Industry Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span className="text-sm">Public Users</span>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleUserChartClick}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {showUserTable ? 'Hide All Users' : 'Show All Users'}
              </button>
            </div>
          </div>

          {/* Posts Data Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Reports</h3>
            <div className="text-sm text-gray-500 mb-4">
              Total Reports: {postData?.totalReportCount || 0}
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatPostData(postData)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Color Legend for Bar Chart */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 mr-2"></div>
                <span className="text-sm">value</span>
              </div>
            </div>
          </div>

          {/* Payment Data Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Payment Status</h3>
            <div className="text-sm text-gray-500 mb-4">
              Total Payments: {paymentData?.total || 0}
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formatPaymentData(paymentData)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={handlePaymentStatusClick}
                    cursor="pointer"
                  >
                    {formatPaymentData(paymentData).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        className="hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Color Legend for Payment Chart */}
            <div className="flex justify-center mt-4 flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 mr-1"></div>
                <span className="text-sm">SUCCESS</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-1"></div>
                <span className="text-sm">FAILED</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 mr-1"></div>
                <span className="text-sm">EXPIRED</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 mr-1"></div>
                <span className="text-sm">PENDING</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Data Selected State */}
      {!startDate || !endDate ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mt-6">
          <p>Please select both start and end dates to view analytics data.</p>
        </div>
      ) : null}

      {/* User Table Component (All Users) */}
      {showUserTable && startDate && endDate && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
              <button 
                onClick={handleCloseUserTableModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[calc(100vh-10rem)] overflow-y-auto p-4">
              <UserTable startDate={startDate} endDate={endDate} />
            </div>
          </div>
        </div>
      )}

      {/* User Type Table Modal (Industry or Public Users) */}
      {selectedUserType && startDate && endDate && (
        <UserTypeTable 
          userType={selectedUserType}
          startDate={startDate}
          endDate={endDate}
          onClose={handleCloseUserTypeModal}
        />
      )}

      {/* Payment Status Table Modal */}
      {selectedPaymentStatus && startDate && endDate && (
        <PaymentStatusTable 
          status={selectedPaymentStatus}
          startDate={startDate}
          endDate={endDate}
          onClose={handleClosePaymentStatusModal}
        />
      )}
    </div>
  );
};

export default Dashboardpie;