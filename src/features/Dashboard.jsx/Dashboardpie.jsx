// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { dashboardval, getAllDashboardValue } from '../../redux/slices/DashboardSlice';
// import { getIndustryUserAction, getPublicUserAction, getUserAction, Industryuservalues, publicuservalues, uservalues } from '../../redux/slices/UsermanagementSlice';
// import { getTotalReportUsersCount, totalreportvalue } from '../../redux/slices/reportPostsSlice';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { getAllTotalUsers, paymentcount, paymentTotalCount, totalpayment } from '../../redux/slices/paymentslice';

// const Dashboardpie = () => {
//   const [showUserList, setShowUserList] = useState(false);
//   const [selectedUserType, setSelectedUserType] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const dashboardallavlue = useSelector(dashboardval);
//   const paymentCount = useSelector(paymentcount)
//   const valueofuser = useSelector(uservalues);
//   const publicuser = useSelector(publicuservalues);
//   const industryuser = useSelector(Industryuservalues);
//   const totalreportusers = useSelector(totalreportvalue);
//   const [payment,setpaymentData] = useState([]);
//   const totalpaymentuser = useSelector(totalpayment);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(4);
//   const [userData, setUserData] = useState([]);
//   const totalPages = 10;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Initial dashboard data load
//     dispatch(getAllDashboardValue());
//     dispatch(getTotalReportUsersCount());
//     dispatch(paymentTotalCount())

//   }, [dispatch]);

//   useEffect(()=>{
//     console.log(totalpaymentuser)
//   });

//   // this is my changing code

//   const handlebarchart = (payment) =>{
//     console.log(payment)

//   }



//   useEffect(()=>{
//     const pageDetails = {
//       pageNo : 1,
//       pageSize : 20
//     }
//     dispatch(getAllTotalUsers(pageDetails))
//   },[])



//   useEffect(() => {
//     if (dashboardallavlue) {
//       if (Array.isArray(dashboardallavlue)) {
//         setUserData(dashboardallavlue);
//       } else if (dashboardallavlue.data && Array.isArray(dashboardallavlue.data)) {
//         setUserData(dashboardallavlue.data);
//       } else {
//         console.log("Unknown data structure, raw dashboardallavlue:", dashboardallavlue);
//         setUserData([]);
//       }
//     }
//   }, [dashboardallavlue]);

//   // Process data for bar chart
//   useEffect(() => {
//     if (totalreportusers && typeof totalreportusers === 'object') {
//       const data = [
//         // { name: 'Inactive Reports', count: totalreportusers.inactiveReportCount || 0, fill: '#3B82F6' },
//         // { name: 'Active Reports', count: totalreportusers.activeReportCount || 0, fill: '#10B981' },
//         { name: 'Total Reports', count: totalreportusers.totalReportCount || 0, fill: '#F59E0B' },
//         { name: 'Total Posts', count: totalreportusers.totalPostCount || 0, fill: '#EF4444' }
//       ];
//       setReportData(data);
//     }
//   }, [totalreportusers]);

//   //process data for bar chart (payment details)


//   useEffect(() => {
//     if (paymentCount && typeof paymentCount === 'object') {
//       const data = [
//         // { name: 'Inactive Reports', count: paymentCount.inactiveReportCount || 0, fill: '#3B82F6' },
//         // { name: 'Active Reports', count: paymentCount.activeReportCount || 0, fill: '#10B981' },
//         { name: 'Total ', count: paymentCount.total || 0, fill: '#F59E0B' },
//         { name: 'Success', count: paymentCount.SUCCESS || 0, fill: '#EF4444' },
//         { name: 'Failed', count: paymentCount.FAILED || 0, fill: '#3B82F6' },
//         { name: 'Expired', count: paymentCount.EXPIRED || 0, fill: '#10B981' },
//         { name: 'Pending', count: paymentCount.PENDING || 0, fill: '#F59E0B' },


//       ];
//       setpaymentData(data);
//     }
//   }, [paymentCount]);





//   // Handle page change - load appropriate user data based on selected type
//   useEffect(() => {
//     if (showUserList && selectedUserType) {
//       loadUsers(selectedUserType);
//     }
//   }, [currentPage, pageSize, selectedUserType, showUserList]);

//   const loadUsers = (userType) => {
//     const pageDetails = {
//       pageNo: currentPage,
//       pageSize: pageSize,
//     };

//     const publicuserdetails = {
//       userType: "Public User",
//       pageNo: currentPage,
//       pageSize: pageSize
//     };

//     const industryuserdetails = {
//       userType: "Industry User",
//       pageNo: currentPage,
//       pageSize: pageSize
//     };

//     if (userType === "Industry Users") {
//       dispatch(getIndustryUserAction(industryuserdetails));
//     } else if (userType === "Public Users") {
//       dispatch(getPublicUserAction(publicuserdetails));
//     } else if (userType === "Total Users") {
//       dispatch(getUserAction(pageDetails));
//     }
//   };

//   const handleeffect = (userType) => {
//     setSelectedUserType(userType);
//     loadUsers(userType);
//     setShowUserList(true);
//   };

//   // Local state to manage dashboard data
//   const [dashboardData, setDashboardData] = useState(null);

//   // Process dashboard data
//   useEffect(() => {
//     if (dashboardallavlue && typeof dashboardallavlue === 'object') {
//       const response = {
//         industryUserCount: dashboardallavlue.industryUserCount || 0,
//         publicUserCount: dashboardallavlue.publicUserCount || 0,
//         totalUserCount: dashboardallavlue.totalUserCount || 0
//       };
//       setDashboardData(response);
//     }
//   }, [dashboardallavlue]);

//   // Process data for pie chart
//   const preparePieChartData = () => {
//     if (!dashboardData) return [];

//     const { industryUserCount, publicUserCount, totalUserCount } = dashboardData;

//     return [
//       { name: 'Industry Users', value: industryUserCount, color: '#3B82F6' }, // blue-500
//       { name: 'Public Users', value: publicUserCount, color: '#10B981' },     // green-500
//       { name: 'Total Users', value: totalUserCount, color: '#F59E0B' }    // amber-500
//     ];
//   };

//   const pieChartData = preparePieChartData();
//   const total = pieChartData.reduce((sum, item) => sum + item.value, 0);

//   // Function to create the SVG pie chart
//   const createPieChart = () => {
//     if (pieChartData.length === 0) return null;

//     const size = 200;
//     const radius = size / 2;
//     const centerX = radius;
//     const centerY = radius;

//     let currentAngle = 0;
//     const paths = [];

//     pieChartData.forEach((item, index) => {
//       const percentage = item.value / total;
//       const angle = percentage * 360;

//       // Calculate start and end points
//       const startAngle = currentAngle;
//       const endAngle = currentAngle + angle;

//       // Convert angles to radians
//       const startRad = (startAngle - 90) * Math.PI / 180;
//       const endRad = (endAngle - 90) * Math.PI / 180;

//       // Calculate points
//       const x1 = centerX + radius * Math.cos(startRad);
//       const y1 = centerY + radius * Math.sin(startRad);
//       const x2 = centerX + radius * Math.cos(endRad);
//       const y2 = centerY + radius * Math.sin(endRad);

//       // Create SVG path
//       const largeArcFlag = angle > 180 ? 1 : 0;
//       const path = `M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;

//       paths.push(
//         <path
//           key={index}
//           d={path}
//           fill={item.color}
//           stroke="#fff"
//           strokeWidth="1"
//           style={{ cursor: 'pointer' }}
//           onClick={() => handleeffect(item.name)}
//         />
//       );

//       currentAngle = endAngle;
//     });

//     return (
//       <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//         {paths}
//       </svg>
//     );
//   };

//   // Get the correct data source based on selected user type
//   const getDisplayData = () => {
//     if (selectedUserType === "Public Users") {
//       return Array.isArray(publicuser) ? publicuser : 
//              (publicuser && Array.isArray(publicuser.data) ? publicuser.data : []);
//     } else if (selectedUserType === "Industry Users") {
//       return Array.isArray(industryuser) ? industryuser : 
//              (industryuser && Array.isArray(industryuser.data) ? industryuser.data : []);
//     } else {
//       // For Total Users, we use valueofuser
//       return Array.isArray(valueofuser) ? valueofuser : 
//              (valueofuser && Array.isArray(valueofuser.data) ? valueofuser.data : []);
//     }
//   };

//   // Modal component for user list popup
//   const UserListModal = ({ onClose }) => {
//     const displayData = getDisplayData();

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-screen overflow-y-auto">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">{selectedUserType}</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border">
//               <thead className="bg-blue-500 text-white">
//                 <tr>
//                   <th className="py-2 px-4 border">User ID</th>
//                   <th className="py-2 px-4 border">Name</th>
//                   <th className="py-2 px-4 border">Email</th>
//                   <th className="py-2 px-4 border">Gender</th>
//                   <th className="py-2 px-4 border">Date of Birth</th>
//                   <th className="py-2 px-4 border">Phone Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {displayData.length > 0 ? (
//                   displayData.map((user, index) => (
//                     <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                       <td className="py-2 px-4 border">{user.id || user.userId}</td>
//                       <td className="py-2 px-4 border">{user.name}</td>
//                       <td className="py-2 px-4 border">{user.email}</td>
//                       <td className="py-2 px-4 border">{user.gender}</td>
//                       <td className="py-2 px-4 border">{user.dob || user.dateOfBirth}</td>
//                       <td className="py-2 px-4 border">{user.phoneNumber}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="py-4 text-center">No user data available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-4 flex justify-center">
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Prev
//               </button>

//               {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//                 // Show pages around current page
//                 const pageNumber = currentPage - 2 + i;
//                 if (pageNumber > 0 && pageNumber <= totalPages) {
//                   return (
//                     <button
//                       key={i}
//                       onClick={() => setCurrentPage(pageNumber)}
//                       className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
//                         }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 }
//                 return null;
//               })}

//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//           <div className="mt-4 flex justify-end">
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-2 py-1 border rounded"
//             >
//               <option value={4}>4</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//             <span className="ml-2 self-center text-sm">Users per page</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen p-4">
//       {/* First Part (1st row, 1st column): User Distribution and User Metrics */}
//       <div className="bg-white rounded-lg shadow-md p-4  row-span-2 ">
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-4">User Management</h2>
//           <div className="flex flex-col md:flex-row items-center justify-center mb-6">
//             {dashboardData ? (
//               <>
//                 {/* SVG Pie Chart */}
//                 <div className="flex justify-center items-center">
//                   {createPieChart()}
//                 </div>

//                 {/* Legend */}
//                 <div className="ml-4 mt-4 md:mt-0">
//                   {pieChartData.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
//                       onClick={() => handleeffect(item.name)}
//                     >
//                       <div className="w-4 h-4 mr-2" style={{ backgroundColor: item.color }}></div>
//                       <span>
//                         {item.name}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center justify-center h-32 w-full">
//                 <p>Loading dashboard data...</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Second Part (1st row, 2nd column): Reports Bar Chart */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-xl font-bold mb-4">Reports</h2>
//         <div className="h-full">
//           {reportData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart
//                 data={reportData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis 
//                   dataKey="name" 
//                   angle={-45} 
//                   textAnchor="end"
//                   height={70}
//                   tick={{ fontSize: 12 }}
//                 />
//                 <YAxis />
//                 <Tooltip 
//                   formatter={(value, name) => [`${value} reports`, 'Count']}
//                 />
//                 <Legend />
//                 <Bar dataKey="count" name="Report Count" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">Loading report data...</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Third Part (2nd row, 1st column): Empty for now
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-xl font-bold mb-4">Payment Details</h2>
//         <div className="h-full">
//           {payment.length > 0 ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart
//                 data={payment}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis 
//                   dataKey="name" 
//                   angle={-45} 
//                   textAnchor="end"
//                   height={70}
//                   tick={{ fontSize: 12 }}
//                 />
//                 <YAxis />
//                 <Tooltip 
//                   formatter={(value, name) => [`${value} reports`, 'Count']}
//                 />
//                 <Legend />
//                 <Bar dataKey="count" name="Report Count" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">Loading report data...</p>
//             </div>
//           )}
//         </div>
//       </div> */}

//       {/* Fourth Part (2nd row, 2nd column): Empty for now */}
//       <div className="bg-white rounded-lg shadow-md p-4">
//         <h2 className="text-xl font-bold mb-4">Payment Details</h2>
//         <div className="h-full">
//           {payment.length > 0 ? (
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart
//                 data={payment} 
//                 margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
//                onClick={() => {handlebarchart(payment)}}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis 
//                   dataKey="name" 
//                   angle={-45} 
//                   textAnchor="end"
//                   height={70}
//                   tick={{ fontSize: 12 }}
//                 />
//                 <YAxis />
//                 <Tooltip 
//                   formatter={(value, name) => [`${value} reports`, 'Count']}
//                 />
//                 <Legend />
//                 <Bar dataKey="count" name="Report Count" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-500">Loading report data...</p>
//             </div>
//           )}
//         </div>
//       </div>


//       {/* User List Modal */}
//       {showUserList && (
//         <UserListModal onClose={() => setShowUserList(false)} />
//       )}
//     </div>
//   );
// };

// export default Dashboardpie;





import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardval, getAllDashboardValue } from '../../redux/slices/DashboardSlice';
import { getIndustryUserAction, getPublicUserAction, getUserAction, Industryuservalues, publicuservalues, uservalues } from '../../redux/slices/UsermanagementSlice';
import { getTotalReportUsersCount, totalreportvalue } from '../../redux/slices/reportPostsSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { paymentcount, getAllTotalUsers, paymentTotalCount, totalpayment, paymentsuccess, successdata, paymentfailed, paymentexpired, paymentpending, faildata, expiredata, pendingdata } from '../../redux/slices/paymentslice';

const Dashboardpie = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showPaymentList, setShowPaymentList] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(''); // industrialuser or public or total user
  const [selecteddata, setselecteddata] = useState('');   // Dynamic keyword
  const [reportData, setReportData] = useState([]);
  const dashboardallavlue = useSelector(dashboardval);
  const paymentCount = useSelector(paymentcount); // payment showing graph
  const valueofuser = useSelector(uservalues);
  const publicuser = useSelector(publicuservalues);
  const industryuser = useSelector(Industryuservalues);
  const totalreportusers = useSelector(totalreportvalue);
  const [payment, setPaymentData] = useState([]);
  const successdatas = useSelector(successdata); // payment popup apivalues for successdatas
  const totalpaymentuser = useSelector(totalpayment);// payment popup apivalues for totalusers
  const faileddatas = useSelector(faildata) // payment popup api values for failedusers
  const expireddatas = useSelector(expiredata) // expireddatas values
  const pendingdatas = useSelector(pendingdata) // pendingdatas values

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [userData, setUserData] = useState([]);
  const totalPages = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    // Initial dashboard data load
    dispatch(getAllDashboardValue());
    dispatch(getTotalReportUsersCount());
    dispatch(paymentTotalCount());  // payment showing details in barchart
  }, [dispatch]);

  useEffect(() => {
    if (dashboardallavlue) {
      if (Array.isArray(dashboardallavlue)) {
        setUserData(dashboardallavlue);
      } else if (dashboardallavlue.data && Array.isArray(dashboardallavlue.data)) {
        setUserData(dashboardallavlue.data);
      } else {
        console.log("Unknown data structure, raw dashboardallavlue:", dashboardallavlue);
        setUserData([]);
      }
    }
  }, [dashboardallavlue]);

  // Process data for bar chart
  useEffect(() => {
    if (totalreportusers && typeof totalreportusers === 'object') {
      const data = [
        { name: 'Total Reports', count: totalreportusers.totalReportCount || 0, fill: '#F59E0B' },
        { name: 'Total Posts', count: totalreportusers.totalPostCount || 0, fill: '#EF4444' }
      ];
      setReportData(data);
    }
  }, [totalreportusers]);


  // useEffect(() => {
  //   const pageDetails = {
  //     pageNo: currentPage,
  //     pageSize: pageSize
  //   }
  //   dispatch(getAllTotalUsers(pageDetails))  //popup api integration   // CHANGED
  // }, [])

  // Process data for bar chart (payment details)
  useEffect(() => {
    if (paymentCount && typeof paymentCount === 'object') {
      const data = [
        { name: 'TOTAL', count: paymentCount.total || 0, fill: '#F59E0B' },
        { name: 'SUCCESS', count: paymentCount.SUCCESS || 0, fill: '#10B981' },
        { name: 'FAILED', count: paymentCount.FAILED || 0, fill: '#EF4444' },
        { name: 'EXPIRED', count: paymentCount.EXPIRED || 0, fill: '#3B82F6' },
        { name: 'PENDING', count: paymentCount.PENDING || 0, fill: '#8B5CF6' },
      ];
      setPaymentData(data);
    }
  }, [paymentCount]);

  // Handle page change - load appropriate user data based on selected type
  useEffect(() => {
    if (showUserList && selectedUserType) {

      loadUsers(selectedUserType);
    }
  }, [currentPage, pageSize, selectedUserType, showUserList]);



  useEffect(() => {
    if (showPaymentList && selecteddata) {
      console.log(currentPage)
      loadtotalusers(selecteddata)
    }
  }, [currentPage, pageSize, selecteddata, showPaymentList]);

  const loadUsers = (userType) => {
    const pageDetails = {
      pageNo: currentPage,
      pageSize: pageSize,
    };

    const publicuserdetails = {
      userType: "Public User",
      pageNo: currentPage,
      pageSize: pageSize
    };

    const industryuserdetails = {
      userType: "Industry User",
      pageNo: currentPage,
      pageSize: pageSize
    };

    if (userType === "Industry Users") {
      dispatch(getIndustryUserAction(industryuserdetails));
    } else if (userType === "Public Users") {
      dispatch(getPublicUserAction(publicuserdetails));
    } else if (userType === "Total Users") {
      dispatch(getUserAction(pageDetails));
    }
  };

  // const loadtotalusers = (data) => {
  //   //console.log("data is triggered")
  //   //console.log(data)

  //   const pageDetails = {
  //     pageNo: currentPage,
  //     pageSize: pageSize,
  //   };

  //   const totaluserpopup = {
  //     //data: "TOTAL",
  //     pageNo: currentPage,
  //     pageSize: pageSize
  //   };

  //   const status = {
  //     status : "SUCCESS"
  //   }

  //   // if (data.name === "Total") {
  //   //   dispatch(getAllTotalUsers(pageDetails))
  //   // }

  //   console.log(data)

  //   if (data.name === "TOTAL") {
  //     console.log(selecteddata)
  //     dispatch(getAllTotalUsers(pageDetails))

  //     // console.log("is triggered")
  //   } 
  //   if( data.name == "SUCCESS"){
  //     console.log(selecteddata)
  //     dispatch(paymentsuccess(status))

  //   }

  // }



  const loadtotalusers = (data) => {
    console.log(data); // this is correct and up-to-date

    const pageDetails = {
      pageNo: currentPage,
      pageSize: pageSize,
    };

    const statussuccess = {
      status: "SUCCESS",
    };
    const statusfailed = {
      status: "FAILED"
    };
    const statusexpired = {
      status: "EXPIRED"
    };
    const statuspending = {
      status: "PENDING"
    };




    // if (data.name === "TOTAL") {
    //   dispatch(getAllTotalUsers(pageDetails));
    // } 

    // if (data.name === "SUCCESS") {
    //   dispatch(paymentsuccess(status));
    // }

    if (data.name === "TOTAL") {
      dispatch(getAllTotalUsers(pageDetails));
    } else if (data.name === "SUCCESS") {
      dispatch(paymentsuccess(statussuccess));

    } else if (data.name === "FAILED") {
      dispatch(paymentfailed(statusfailed));

    } else if (data.name === "EXPIRED") {
      dispatch(paymentexpired(statusexpired));

    } else if (data.name === "PENDING") {
      dispatch(paymentpending(statuspending));

    }
  };





  // Modified handler for pie chart segments
  const handleeffect = (userType) => {
    setSelectedUserType(userType);

    // Only show payment data when "Total" is clicked in the bar chart
    setShowUserList(true);
    loadUsers(userType);
  };

  // Handle bar chart click for payments


  // const handleBarClick = (data) => {
  //   if (data && data.name === "Total") {
  //     setShowPaymentList(true);
  //   }
  // };   //OLDER CODE 

  // const handleBarClick = (data) => {
  //   setselecteddata(data)
  //   console.log(selecteddata)
  //   setShowPaymentList(true);
  //   loadtotalusers(data);   // totaluser popdata passing
  // }



  const handleBarClick = (data) => {

    setselecteddata(data); // updates the state, but it's async
    console.log(selecteddata);     // log the actual clicked data
    setShowPaymentList(true);
    loadtotalusers(data);  // pass directly instead of using selecteddata
  };







  // Local state to manage dashboard data
  const [dashboardData, setDashboardData] = useState(null);

  // Process dashboard data
  useEffect(() => {
    if (dashboardallavlue && typeof dashboardallavlue === 'object') {
      const response = {
        industryUserCount: dashboardallavlue.industryUserCount || 0,
        publicUserCount: dashboardallavlue.publicUserCount || 0,
        totalUserCount: dashboardallavlue.totalUserCount || 0
      };
      setDashboardData(response);
    }
  }, [dashboardallavlue]);

  // Process data for pie chart
  const preparePieChartData = () => {
    if (!dashboardData) return [];

    const { industryUserCount, publicUserCount, totalUserCount } = dashboardData;

    return [
      { name: 'Industry Users', value: industryUserCount, color: '#3B82F6' },
      { name: 'Public Users', value: publicUserCount, color: '#10B981' },
      { name: 'Total Users', value: totalUserCount, color: '#F59E0B' }
    ];
  };

  const pieChartData = preparePieChartData();
  const total = pieChartData.reduce((sum, item) => sum + item.value, 0);

  // Function to create the SVG pie chart
  const createPieChart = () => {
    if (pieChartData.length === 0) return null;

    const size = 250;
    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;

    let currentAngle = 0;
    const paths = [];

    pieChartData.forEach((item, index) => {
      const percentage = item.value / total;
      const angle = percentage * 360;

      // Calculate start and end points
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;

      // Convert angles to radians
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;

      // Calculate points
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);

      // Create SVG path
      const largeArcFlag = angle > 180 ? 1 : 0;
      const path = `M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;

      paths.push(
        <path
          key={index}
          d={path}
          fill={item.color}
          stroke="#fff"
          strokeWidth="1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleeffect(item.name)}
        />
      );

      currentAngle = endAngle;
    });

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths}
      </svg>
    );
  };

  // Get the correct data source based on selected user type
  const getDisplayData = () => {
    if (selectedUserType === "Public Users") {
      return Array.isArray(publicuser) ? publicuser :
        (publicuser && Array.isArray(publicuser.data) ? publicuser.data : []);
    } else if (selectedUserType === "Industry Users") {
      return Array.isArray(industryuser) ? industryuser :
        (industryuser && Array.isArray(industryuser.data) ? industryuser.data : []);
    } else {
      // For Total Users, we use valueofuser
      return Array.isArray(valueofuser) ? valueofuser :
        (valueofuser && Array.isArray(valueofuser.data) ? valueofuser.data : []);
    }
  };







  // Modal component for user list popup
  const UserListModal = ({ onClose }) => {
    const displayData = getDisplayData();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{selectedUserType}</h2>
            <div className='flex ml-80'>
              <FaSearch size={20} />
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border"> ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Gender</th>

                  <th className="py-2 px-4 border">Date of Birth</th>
                  <th className="py-2 px-4 border">Phone Number</th>
                  <th className="py-2 px-4 border">Address</th>
                  <th className="py-2 px-4 border">User type</th>
                </tr>
              </thead>
              <tbody>
                {displayData.length > 0 ? (
                  displayData.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border">{user.id || user.userId}</td>
                      <td className="py-2 px-4 border">{user.name}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border">{user.gender}</td>
                      <td className="py-2 px-4 border">{user.dob || user.dateOfBirth}</td>
                      <td className="py-2 px-4 border">{user.phoneNumber}</td>
                      <td className="py-2 px-4 border">{user.address}</td>
                      <td className="py-2 px-4 border">{user.usertype}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center">No user data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                const pageNumber = currentPage - 2 + i;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-2 py-1 border rounded"
            >
              <option value={4}>4</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2 self-center text-sm">Users per page</span>
          </div>
        </div>
      </div>
    );
  };

  // Modal component for payment list popup
  const PaymentListModal = ({ onClose }) => {
    const paymentData = Array.isArray(totalpaymentuser) ? totalpaymentuser :
      (totalpaymentuser && Array.isArray(totalpaymentuser.data) ? totalpaymentuser.data : []);


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Payment Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border">User ID</th>
                  <th className="py-2 px-4 border">Payment ID</th>
                  <th className="py-2 px-4 border">Firstname</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">E-mail</th>
                  <th className="py-2 px-4 border">Promotion Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.length > 0 ? (
                  paymentData.map((payment, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border">{payment.userId || payment.paymentId}</td>
                      <td className="py-2 px-4 border">{payment.paymentId || payment.userName}</td>
                      <td className="py-2 px-4 border">{payment.firstname}</td>
                      <td className="py-2 px-4 border">
                        <span className={`px-2 py-1 rounded-full text-xs ${payment.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                          payment.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                            payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              payment.status === 'EXPIRED' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                          }`}>
                          {payment.amount}
                        </span>

                      </td>
                      <td className="py-2 px-4 border">{payment.email || payment.email}</td>
                      <td className="py-2 px-4 border">{payment.promotionStatus || payment.paymentDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">No payment data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                const pageNumber = currentPage - 2 + i;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };







  const SuccessListModal = ({ onClose }) => {

    const sdata = Array.isArray(successdatas) ? successdatas :
      (successdatas && Array.isArray(successdatas.data) ? successdatas.data : []);


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Success Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border">S.No</th>
                  <th className="py-2 px-4 border">Tnx ID</th>
                  <th className="py-2 px-4 border">Firstname</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">E-mail</th>
                  <th className="py-2 px-4 border">Product Info</th>
                </tr>
              </thead>
              <tbody>
                {sdata.length > 0 ? (
                  sdata.map((datas, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{datas.txnid || datas.txnid}</td>
                      <td className="py-2 px-4 border">{datas.firstname}</td>
                      <td className="py-2 px-4 border">
                        <span className={`px-2 py-1 rounded-full text-xs ${datas.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                          datas.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                            datas.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              datas.status === 'EXPIRED' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                          }`}>
                          {datas.amount}
                        </span>

                      </td>
                      <td className="py-2 px-4 border">{datas.email || datas.email}</td>
                      <td className="py-2 px-4 border">{datas.productinfo || datas.productinfo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">No payment data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='mt-3'>

          </div>

          {/* <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                const pageNumber = currentPage - 2 + i;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  };



  const FailedListModal = ({ onClose }) => {
    const fdata = Array.isArray(faileddatas) ? faileddatas :
      (faileddatas && Array.isArray(faileddatas.data) ? faileddatas.data : []);


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Failed Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border">S.No</th>
                  <th className="py-2 px-4 border">Tnx ID</th>
                  <th className="py-2 px-4 border">Firstname</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">E-mail</th>
                  <th className="py-2 px-4 border">Product Info</th>
                </tr>
              </thead>
              <tbody>
                {fdata.length > 0 ? (
                  fdata.map((datas, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{datas.txnid || datas.txnid}</td>
                      <td className="py-2 px-4 border">{datas.firstname}</td>
                      <td className="py-2 px-4 border">
                        <span className={`px-2 py-1 rounded-full text-xs ${datas.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                          datas.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                            datas.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              datas.status === 'EXPIRED' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                          }`}>
                          {datas.amount}
                        </span>

                      </td>
                      <td className="py-2 px-4 border">{datas.email || datas.email}</td>
                      <td className="py-2 px-4 border">{datas.productinfo || datas.productinfo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">No payment data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='mt-3'>

          </div>

          {/* <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                const pageNumber = currentPage - 2 + i;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  };
  const ExpiredListModal = ({ onClose }) => {
    const edata = Array.isArray(expireddatas) ? expireddatas :
      (expireddatas && Array.isArray(expireddatas.data) ? expireddatas.data : []);


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Expired Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border">S.No</th>
                  <th className="py-2 px-4 border">Tnx ID</th>
                  <th className="py-2 px-4 border">Firstname</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">E-mail</th>
                  <th className="py-2 px-4 border">Product Info</th>
                </tr>
              </thead>
              <tbody>
                {edata.length > 0 ? (
                  edata.map((datas, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{datas.txnid || datas.txnid}</td>
                      <td className="py-2 px-4 border">{datas.firstname}</td>
                      <td className="py-2 px-4 border">
                        <span className={`px-2 py-1 rounded-full text-xs ${datas.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                          datas.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                            datas.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              datas.status === 'EXPIRED' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                          }`}>
                          {datas.amount}
                        </span>

                      </td>
                      <td className="py-2 px-4 border">{datas.email || datas.email}</td>
                      <td className="py-2 px-4 border">{datas.productinfo || datas.productinfo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">No payment data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='mt-3'>

          </div>

          {/* <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                const pageNumber = currentPage - 2 + i;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  const PendingListModal = ({ onClose }) => {
    const pdata = Array.isArray(pendingdatas) ? pendingdatas :
      (pendingdatas && Array.isArray(pendingdatas.data) ? pendingdatas.data : []);


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pending Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-2 px-4 border">S.No</th>
                  <th className="py-2 px-4 border">Tnx ID</th>
                  <th className="py-2 px-4 border">Firstname</th>
                  <th className="py-2 px-4 border">Amount</th>
                  <th className="py-2 px-4 border">E-mail</th>
                  <th className="py-2 px-4 border">Product Info</th>
                </tr>
              </thead>
              <tbody>
                {pdata.length > 0 ? (
                  pdata.map((datas, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{datas.txnid || datas.txnid}</td>
                      <td className="py-2 px-4 border">{datas.firstname}</td>
                      <td className="py-2 px-4 border">
                        <span className={`px-2 py-1 rounded-full text-xs ${datas.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                          datas.status === 'FAILED' ? 'bg-red-100 text-red-800' :
                            datas.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              datas.status === 'EXPIRED' ? 'bg-gray-100 text-gray-800' :
                                'bg-blue-100 text-blue-800'
                          }`}>
                          {datas.amount}
                        </span>

                      </td>
                      <td className="py-2 px-4 border">{datas.email || datas.email}</td>
                      <td className="py-2 px-4 border">{datas.productinfo || datas.productinfo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">No payment data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='mt-3'>

          </div>

          {/* <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                const pageNumber = currentPage - 2 + i;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  };







  // Custom bar chart component that can handle click events
  const CustomBarChart = ({ data, handleBarClick }) => {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
          onClick={(data) => {
            if (data && data.activePayload && data.activePayload[0]) {
              handleBarClick(data.activePayload[0].payload);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [`${value}`, 'Count']}
          />
          <Legend />
          <Bar dataKey="count" name="Count" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // return (
  //   <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen p-4">
  //     {/* First Part: User Management with Pie Chart */}
  //     <div className="bg-white rounded-lg shadow-md p-4 row-span-2">
  //       <div className="h-full flex flex-col">
  //         <h1 className="text-4xl font-bold mt-10">User Management</h1>

  //         {/* Center the pie chart and legend vertically and horizontally */}
  //         <div className="flex-grow flex flex-col justify-center items-center">
  //           {dashboardData ? (
  //             <div className="flex flex-col md:flex-row items-center justify-center w-full mb-16">
  //               {/* SVG Pie Chart */}
  //               <div className="mb-4 md:mb-0">
  //                 {createPieChart()}
  //               </div>

  //               {/* Legend */}
  //               <div className="md:ml-8 ">
  //                 {pieChartData.map((item, index) => (
  //                   <div
  //                     key={index}
  //                     className="flex items-center mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition duration-150"
  //                     onClick={() => handleeffect(item.name)}
  //                   >
  //                     <div className="w-5 h-5 mr-3" style={{ backgroundColor: item.color }}></div>
  //                     <span className="text-lg font-medium">
  //                       {item.name}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
  //                     </span>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="flex items-center justify-center h-32 w-full">
  //               <p>Loading dashboard data...</p>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>

  //     {/* Second Part: Reports Bar Chart */}
  //     <div className="bg-white rounded-lg shadow-md p-4">
  //       <h2 className="text-xl font-bold mb-4">Reports</h2>
  //       <div className="h-full">
  //         {reportData.length > 0 ? (
  //           <ResponsiveContainer width="100%" height={250}>
  //             <BarChart
  //               data={reportData}
  //               margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
  //             >
  //               <CartesianGrid strokeDasharray="3 3" />
  //               <XAxis
  //                 dataKey="name"
  //                 angle={-45}
  //                 textAnchor="end"
  //                 height={70}
  //                 tick={{ fontSize: 12 }}
  //               />
  //               <YAxis />
  //               <Tooltip
  //                 formatter={(value, name) => [`${value}`, 'Count']}
  //               />
  //               <Legend />
  //               <Bar dataKey="count" name="Report Count" />
  //             </BarChart>
  //           </ResponsiveContainer>
  //         ) : (
  //           <div className="flex items-center justify-center h-full">
  //             <p className="text-gray-500">Loading report data...</p>
  //           </div>
  //         )}
  //       </div>
  //     </div>

  //     {/* Fourth Part: Payment Details with Clickable Chart */}
  //     <div className="bg-white rounded-lg shadow-md p-4">
  //       <h2 className="text-xl font-bold mb-4">Payment Details</h2>
  //       <div className="h-full">
  //         {payment.length > 0 ? (
  //           <CustomBarChart
  //             data={payment}
  //             handleBarClick={handleBarClick}
  //           />
  //         ) : (
  //           <div className="flex items-center justify-center h-full">
  //             <p className="text-gray-500">Loading payment data...</p>
  //           </div>
  //         )}
  //         <div className="mt-2 text-center text-xs text-gray-500">
  //           Click on the 'Total' bar to view detailed payment information
  //         </div>
  //       </div>
  //     </div>

  //     {/* User List Modal */}
  //     {showUserList && (
  //       <UserListModal onClose={() => setShowUserList(false)} />
  //     )}



  //     {/* Payment List Modal */}
  //     {showPaymentList && selecteddata.name === "TOTAL" && (
  //       <PaymentListModal onClose={() => setShowPaymentList(false)} />
  //     )}

  //     {/* success list model */}

  //     {showPaymentList && selecteddata.name === "SUCCESS" && (
  //       <SuccessListModal onClose={() => setShowPaymentList(false)} />
  //     )}

  //     {showPaymentList && selecteddata.name === "FAILED" && (
  //       <FailedListModal onClose={() => setShowPaymentList(false)} />
  //     )}


  //     {showPaymentList && selecteddata.name === "EXPIRED" && (
  //       <ExpiredListModal onClose={() => setShowPaymentList(false)} />
  //     )}


  //     {showPaymentList && selecteddata.name === "PENDING" && (
  //       <PendingListModal onClose={() => setShowPaymentList(false)} />
  //     )}

  //   </div>




  // );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen p-4">
      {/* First Part: User Management with Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 md:row-span-2 order-1">
        <div className="h-full flex flex-col">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 md:mt-6 text-center md:text-left">User Management</h1>
  
          {/* Center the pie chart and legend */}
          <div className="flex-grow flex flex-col justify-center items-center">
            {dashboardData ? (
              <div className="flex flex-col w-full mb-8 md:mb-16">
                {/* SVG Pie Chart */}
                <div className="flex justify-center mb-6">
                  {createPieChart()}
                </div>
  
                {/* Legend */}
                <div className="w-full px-2 md:px-4">
                  {pieChartData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center mb-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition duration-150"
                      onClick={() => handleeffect(item.name)}
                    >
                      <div className="w-4 md:w-5 h-4 md:h-5 mr-2 md:mr-3" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm md:text-base lg:text-lg font-medium">
                        {item.name}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 w-full">
                <p>Loading dashboard data...</p>
              </div>
            )}
          </div>
        </div>
      </div>
  
      {/* Second Part: Reports Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 order-2 md:order-2">
        <h2 className="text-lg md:text-xl font-bold mb-4">Reports</h2>
        <div className="h-64 md:h-full">
          {reportData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200} className="mt-2">
              <BarChart
                data={reportData}
                margin={{ top: 5, right: 10, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 10 }}
                />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(value, name) => [`${value}`, 'Count']}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="count" name="Report Count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading report data...</p>
            </div>
          )}
        </div>
      </div>
  
      {/* Fourth Part: Payment Details with Clickable Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 order-3 md:order-3">
        <h2 className="text-lg md:text-xl font-bold mb-4">Payment Details</h2>
        <div className="h-64 md:h-full">
          {payment.length > 0 ? (
            <div className="h-full">
              <CustomBarChart
                data={payment}
                handleBarClick={handleBarClick}
              />
              <div className="mt-2 text-center text-xs text-gray-500">
                Click on a bar to view detailed payment information
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading payment data...</p>
            </div>
          )}
        </div>
      </div>
  
      {/* User List Modal */}
      {showUserList && (
        <UserListModal onClose={() => setShowUserList(false)} />
      )}
  
      {/* Payment List Modals */}
      {showPaymentList && selecteddata.name === "TOTAL" && (
        <PaymentListModal onClose={() => setShowPaymentList(false)} />
      )}
  
      {showPaymentList && selecteddata.name === "SUCCESS" && (
        <SuccessListModal onClose={() => setShowPaymentList(false)} />
      )}
  
      {showPaymentList && selecteddata.name === "FAILED" && (
        <FailedListModal onClose={() => setShowPaymentList(false)} />
      )}
  
      {showPaymentList && selecteddata.name === "EXPIRED" && (
        <ExpiredListModal onClose={() => setShowPaymentList(false)} />
      )}
  
      {showPaymentList && selecteddata.name === "PENDING" && (
        <PendingListModal onClose={() => setShowPaymentList(false)} />
      )}
    </div>
  );
};

export default Dashboardpie;










