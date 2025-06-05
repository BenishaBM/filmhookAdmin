// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// const PaymentStatusTable = ({ status, startDate, endDate, onClose }) => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     pageSize: 10
//   });

//   useEffect(() => {
//     fetchPaymentsByStatus();
//   }, [status, startDate, endDate, pagination.currentPage]);

//   const fetchPaymentsByStatus = async () => {
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       setError("Authentication token not found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllPaymentStatus?status=${status}&pageNo=${pagination.currentPage}&pageSize=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 401 || response.status === 403) {
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.status === 1) {
//         setPayments(result.data.data || []);
//         setPagination({
//           ...pagination,
//           totalPages: result.data.totalPages || 1,
//           totalItems: result.data.totalItems || 0
//         });
//       } else {
//         throw new Error(result.message || "Failed to fetch payment data");
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setPagination({
//         ...pagination,
//         currentPage: newPage
//       });
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'SUCCESS':
//         return 'bg-green-100 text-green-800';
//       case 'FAILED':
//         return 'bg-red-100 text-red-800';
//       case 'PENDING':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'EXPIRED':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-blue-100 text-blue-800';
//     }
//   };

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-800">
//             {status} Payments
//             <span className="ml-2 text-sm font-normal text-gray-500">
//               ({pagination.totalItems} total)
//             </span>
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             <X size={20} />
//           </button>
//         </div>
        
//         <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
//           {loading ? (
//             <div className="flex justify-center items-center p-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="p-4 text-red-500">
//               <p>{error}</p>
//             </div>
//           ) : payments.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No payment data found for the selected status and date range.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {payments.map((payment) => (
//                     <tr key={payment.paymentId} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.paymentId}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.txnid}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.productinfo}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.firstname}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.email}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.postId}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.promotionStatus || status)}`}>
//                           {payment.promotionStatus || status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         {/* Pagination Controls */}
//         {!loading && !error && payments.length > 0 && (
//           <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
//             <div className="flex-1 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">{((pagination.currentPage - 1) * pagination.pageSize) + 1}</span> to{' '}
//                   <span className="font-medium">
//                     {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
//                   </span>{' '}
//                   of <span className="font-medium">{pagination.totalItems}</span> results
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handlePageChange(pagination.currentPage - 1)}
//                   disabled={pagination.currentPage === 1}
//                   className={`${
//                     pagination.currentPage === 1 
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                       : 'bg-white text-gray-700 hover:bg-gray-50'
//                   } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => handlePageChange(pagination.currentPage + 1)}
//                   disabled={pagination.currentPage === pagination.totalPages}
//                   className={`${
//                     pagination.currentPage === pagination.totalPages 
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                       : 'bg-white text-gray-700 hover:bg-gray-50'
//                   } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentStatusTable;







///  the second most most main working code-------------most finallllllll--------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';

// const PaymentStatusTable = ({ status, startDate, endDate, onClose }) => {
//   const [payments, setPayments] = useState([]);
//   const [filteredPayments, setFilteredPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     pageSize: 10
//   });

//   useEffect(() => {
//     fetchPaymentsByStatus();
//   }, [status, startDate, endDate, pagination.currentPage]);

//   useEffect(() => {
//     if (payments.length > 0) {
//       filterPayments();
//     }
//   }, [searchTerm, payments]);

//   const fetchPaymentsByStatus = async () => {
//     const token = localStorage.getItem('jwt');
//     if (!token) {
//       setError("Authentication token not found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/admin/getAllPaymentStatus?status=${status}&pageNo=${pagination.currentPage}&pageSize=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (!response.ok) {
//         if (response.status === 401 || response.status === 403) {
//           throw new Error('Authentication failed. Please log in again.');
//         }
//         throw new Error(`Server responded with status: ${response.status}`);
//       }

//       const result = await response.json();
      
//       if (result.status === 1) {
//         const paymentData = result.data.data || [];
//         setPayments(paymentData);
//         setFilteredPayments(paymentData);
//         setPagination({
//           ...pagination,
//           totalPages: result.data.totalPages || 1,
//           totalItems: result.data.totalItems || 0
//         });
//       } else {
//         throw new Error(result.message || "Failed to fetch payment data");
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error("API error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterPayments = () => {
//     if (!searchTerm.trim()) {
//       setFilteredPayments(payments);
//       return;
//     }

//     const term = searchTerm.toLowerCase().trim();
//     const filtered = payments.filter(payment => 
//       (payment.firstname && payment.firstname.toLowerCase().includes(term)) ||
//       (payment.email && payment.email.toLowerCase().includes(term)) ||
//       (payment.phone && payment.phone.toLowerCase().includes(term))
//     );
    
//     setFilteredPayments(filtered);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setPagination({
//         ...pagination,
//         currentPage: newPage
//       });
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'SUCCESS':
//         return 'bg-green-100 text-green-800';
//       case 'FAILED':
//         return 'bg-red-100 text-red-800';
//       case 'PENDING':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'EXPIRED':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-blue-100 text-blue-800';
//     }
//   };

//   return (
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-800">
//             {status} Payments
//             <span className="ml-2 text-sm font-normal text-gray-500">
//               ({pagination.totalItems} total)
//             </span>
//           </h2>
//           <div className="flex items-center space-x-2">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Search size={16} className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search by name, email, or phone"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//               />
//             </div>
//             <button 
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>
        
//         <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
//           {loading ? (
//             <div className="flex justify-center items-center p-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="p-4 text-red-500">
//               <p>{error}</p>
//             </div>
//           ) : filteredPayments.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               {searchTerm ? 'No results match your search criteria.' : 'No payment data found for the selected status and date range.'}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredPayments.map((payment) => (
//                     <tr key={payment.paymentId} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.paymentId}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.txnid}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.productinfo}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.firstname}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.email}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.phone || 'N/A'}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.postId}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.promotionStatus || status)}`}>
//                           {payment.promotionStatus || status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         {/* Pagination Controls */}
//         {!loading && !error && filteredPayments.length > 0 && !searchTerm && (
//           <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between">
//             <div className="flex-1 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">{((pagination.currentPage - 1) * pagination.pageSize) + 1}</span> to{' '}
//                   <span className="font-medium">
//                     {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}
//                   </span>{' '}
//                   of <span className="font-medium">{pagination.totalItems}</span> results
//                 </p>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handlePageChange(pagination.currentPage - 1)}
//                   disabled={pagination.currentPage === 1}
//                   className={`${
//                     pagination.currentPage === 1 
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                       : 'bg-white text-gray-700 hover:bg-gray-50'
//                   } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
//                 >
//                   <ChevronLeft size={16} />
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => handlePageChange(pagination.currentPage + 1)}
//                   disabled={pagination.currentPage === pagination.totalPages}
//                   className={`${
//                     pagination.currentPage === pagination.totalPages 
//                       ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                       : 'bg-white text-gray-700 hover:bg-gray-50'
//                   } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md`}
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentStatusTable;










import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';
import { Eye } from 'lucide-react';

const PaymentStatusTable = ({ status, startDate, endDate, onClose }) => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10
  });
  const [selectKey, setSelectKey] = useState(0);

  useEffect(() => {
    fetchPaymentsByStatus();
  }, [status, startDate, endDate, pagination.currentPage, pagination.pageSize]);

  useEffect(() => {
    if (payments.length > 0) {
      filterPayments();
    }
  }, [searchTerm, payments]);

  const fetchPaymentsByStatus = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://www.filmhooks.annulartech.net/admin/getAllPaymentStatus?status=${status}&pageNo=${pagination.currentPage}&pageSize=${pagination.pageSize}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 1) {
        const paymentData = result.data.data || [];
        setPayments(paymentData);
        setFilteredPayments(paymentData);
        setPagination({
          ...pagination,
          totalPages: result.data.totalPages || 1,
          totalItems: result.data.totalItems || 0
        });
      } else {
        throw new Error(result.message || "Failed to fetch payment data");
      }
    } catch (err) {
      setError(err.message);
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterPayments = () => {
    if (!searchTerm.trim()) {
      setFilteredPayments(payments);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const filtered = payments.filter(payment => 
      (payment.firstname && payment.firstname.toLowerCase().includes(term)) ||
      (payment.email && payment.email.toLowerCase().includes(term)) ||
      (payment.phone && payment.phone.toLowerCase().includes(term))
    );
    
    setFilteredPayments(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({
        ...pagination,
        currentPage: newPage
      });
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPagination({
      ...pagination,
      pageSize: newSize,
      currentPage: 1
    });
    setSelectKey(prevKey => prevKey + 1);
  };

  const handlePreviousPage = () => {
    handlePageChange(pagination.currentPage - 1);
  };

  const handleNextPage = () => {
    handlePageChange(pagination.currentPage + 1);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'EXPIRED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const titles=["Payment ID","Transaction ID","Amount","Product","Name","Email","Phone","Post ID","Status"]

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {status} Payments
            <span className="ml-2 text-sm font-normal">
              ({pagination.totalItems} total)
            </span>
          </h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or phone"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border border-gray-300 focus:outline-hidden hover:border-blue-200 rounded-md text-sm"
              />
            </div>
            <button
              onClick={onClose}
              // className="absolute top-8 right-6 z-10 px-4 py-2 bg-transparent text-white rounded-lg hover:bg-blue-700 transition flex items-center"
              className="z-10 w-12 h-12 text-blue-300 rounded-full hover:text-blue-700 transition flex items-center justify-center"
            >
              <span className="hover:scale-125">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>

              {/* Close */}
            </button>
          </div>
        </div>
        
        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-500">
              <p>{error}</p>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {searchTerm ? 'No results match your search criteria.' : 'No payment data found for the selected status and date range.'}
            </div>
          ) : (
            <div className="overflow-x-auto p-4">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr className='bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg'>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                    {
                      titles.map((title)=>(
                        <th
                          key={title}
                          className='py-3 px-4 text-left font-medium text-white whitespace-nowrap z-10'
                        >
                          {title}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.paymentId} className="hover:bg-gray-50 [&:nth-child(even)]:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.paymentId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.txnid}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.productinfo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.firstname}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.phone || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.postId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.promotionStatus || status)}`}>
                          {payment.promotionStatus || status}
                        </span>
                      </td>
                      {/* <td className="py-3 px-4">
                        <button
                          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer whitespace-nowrap"
                        >
                          <Eye size={16} className="mr-1" />
                          View Details
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* New Pagination Controls */}
        {!loading && !error && filteredPayments.length > 0 && !searchTerm && (
          <div className="flex justify-between items-center border-t border-blue-gray-50 p-4 mt-1">
            <div className="text-sm text-blue-gray font-normal">
              Showing page {pagination.currentPage} of {Math.ceil(pagination.totalItems / pagination.pageSize)}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-18 h-8 flex items-center justify-center">
                <select
                  key={selectKey}
                  value={pagination.pageSize.toString()}
                  onChange={handlePageSizeChange}
                  className="rounded-full border border-black px-4 py-1 text-sm"
                >
                  {[5, 10, 15, 20, 25].map((size) => (
                    <option key={size} value={size.toString()} className="py-1 text-sm">
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <button
                size="sm"
                disabled={pagination.currentPage === 1}
                className="rounded-full border border-black px-4 py-1 text-sm"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <button
                size="sm"
                disabled={pagination.currentPage === pagination.totalPages}
                className="rounded-full border border-black px-4 py-1 text-sm"
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusTable;
























