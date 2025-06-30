
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getAllPostReportAction,
//   setReportPostFiles,
//   setRepotUserDetails,
// } from "../../redux/slices/reportPostsSlice";
// import { Link } from "react-router-dom";
// import {
//   ArrowDownTrayIcon,
//   MagnifyingGlassIcon,
//   XMarkIcon,
//   EyeIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon
// } from "@heroicons/react/24/outline";


// import {
//   Card,
//   CardFooter,
//   CardHeader,
//   Typography,
//   Button,
//   CardBody,
//   Tooltip,
//   Input,
//   Switch,
//   IconButton,
//   Select,
//   Option,
// } from "@material-tailwind/react";

// const Report = () => {
//   const {
//     getAllpostReportLoadingStatus,
//     getAllpostReportLoadingErrorMsg,
//     getAllPostReportList,
//   } = useSelector((state) => state.reportPost);
//   const dispatch = useDispatch();


//   useEffect(()=> {
//     console.log(getAllPostReportList)

//   })

//   const reportPosts = getAllPostReportList.map((report) => ({
//     userDetails: report.reportUserIds,
//     posts: report.postWebModel.postFiles,
//     postId: report.postWebModel.id,
//     description: report.postWebModel.description,
//     userId: report.postWebModel.userId,
//     userName: report.postWebModel.userName,
//     // reportCount: report.reportUserIdCount,
//     reportCount : report.reportUserIds[0].reportCount

//   }));
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchName, setSearchName] = useState("");
//   const [pageSize, setPageSize] = useState(10);
//   const [selectKey, setSelectKey] = useState(Date.now()); // For forcing Select re-render when needed


//   // State for popup
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);
//   // State for carousel
//   const [currentImageIndex, setCurrentImageIndex] = useState(0); //newchanges



//   useEffect(() => {
//     const pageDetails = {
//       pageNo: 1,
//       pageSize: 10,
//     };
//     const valuess = dispatch(getAllPostReportAction(pageDetails));
//     console.log("data is comming");
//     console.log(valuess);
//   }, []);

//   const handleSearch = (e) => {
//     console.log("name", e.target.value);
//     setSearchName(e.target.value);
//   };

//    // Handle view button click
//    const handleViewClick = (post) => {
//     // Store the selected post data in state
//     setSelectedPost(post);
//     console.log(selectedPost);
//     // Store the data in Redux as before
//     dispatch(setReportPostFiles(post.posts));
//     dispatch(setRepotUserDetails(post.userDetails));
//     // Open the popup
//     setIsPopupOpen(true);
//   };    // new changes


//    // Close popup
//    const handleClosePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedPost(null);
//   }; //newchanges


//     // Carousel navigation
//     const goToNextImage = () => {
//       if (selectedPost && selectedPost.posts) {
//         setCurrentImageIndex((prevIndex) =>
//           prevIndex === selectedPost.posts.length - 1 ? 0 : prevIndex + 1
//         );
//       }
//     }; //newchanges


//     const goToPrevImage = () => {
//       if (selectedPost && selectedPost.posts) {
//         setCurrentImageIndex((prevIndex) =>
//           prevIndex === 0 ? selectedPost.posts.length - 1 : prevIndex - 1
//         );
//       }
//     };  // newchanges



//   const fliterdReportPostList = reportPosts.filter(
//     (post) => post.description.toLowerCase().includes(searchName.toLocaleLowerCase())
//   );

//   const totalRecords = fliterdReportPostList.length;
//   const totalPages = Math.ceil(totalRecords / pageSize);
//   const lastIndex = currentPage * pageSize;
//   const firstIndex = lastIndex - pageSize;
//   const postRecords = fliterdReportPostList.slice(firstIndex, lastIndex);
  
//   // Pagination handlers
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

//   const handlePageSizeChange = (value) => {
//     setPageSize(Number(value));
//     setCurrentPage(1); // Reset to first page when changing page size
//     setSelectKey(Date.now()); // Force Select component to re-render
//   };

//   const TABLE_HEAD = ["Post Id", "Description", "Report Count", "Actions"];

//   // Translation object (you might want to replace this with your actual translation setup)
//   const t = {
//     showingPage: "Showing Page",
//     of: "of",
//     previous: "Previous",
//     next: "Next"
//   };

//   return (

//     <>
      
//       <div className="p-1 max-w-6xl mx-auto">
//         <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen">
//           {/* Header Section with Gradient Text */}
//           <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Reports
//             </h1>
//             {/* Search Bar */}
//             <div className="p-6 border-b border-gray-100 bg-gray-50 ">
//               <div className="flex flex-col sm:flex-row items-center gap-4 w-96">
//                 <div className="w-full md:w-72 relative flex items-center">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
//                     placeholder="Search reports..."
//                     onChange={handleSearch}
//                   />
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* Main Card */}
//           <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl p-4">
            
//             {/* Table Content */}
//             {/* <div className="overflow-x-auto"> */}
//               {getAllpostReportLoadingErrorMsg && (
//                 <div className="p-8 text-center">
//                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
//                     <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900">Error Loading Data</h3>
//                   <p className="mt-2 text-gray-600">{getAllpostReportLoadingErrorMsg}</p>
//                   <button
//                     className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-150"
//                     onClick={() => dispatch(getAllPostReportAction({ pageNo: 1, pageSize: 10 }))}
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               )}

//               {!getAllpostReportLoadingErrorMsg && (
//                 <div className="overflow-x-auto block max-h-[400px]">
//                   <table className="min-w-full bg-white rounded-lg overflow-hidden">
//                     <thead className="bg-gray-50">
//                       <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
//                         {TABLE_HEAD.map((head, index) => (
//                           <th key={index} className="py-3 px-4 text-left font-medium text-white whitespace-nowrap z-10">
//                             {head}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody className="overflow-y-auto">
//                       {/* className="block max-h-[400px] overflow-y-auto" */}
//                       {postRecords.length > 0 && (
//                         postRecords.map((item, index) => (
//                           <tr
//                             key={index}
//                             className={`border-b border-gray-100 transition-colors duration-200 hover:bg-indigo-50 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
//                           >
//                             <td className="py-3 px-6">
//                               <div className="flex items-center">
//                                 <span className="font-medium text-gray-800">{index + 1}</span>
//                               </div>
//                             </td>
//                             <td className="py-3 px-6">
//                               <p className="text-gray-800 line-clamp-2">
//                                 {item.description || "No description provided"}
//                               </p>
//                             </td>
//                             <td className="py-3 px-6">
//                               <div className="flex items-center">
//                                 <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 font-medium text-xs mr-2">
//                                   {item.reportCount}
//                                 </span>
//                                 <span className="text-gray-600 text-sm">reports</span>
//                               </div>
//                             </td>
//                             <td className="py-3 px-6">
                            
//                               <button
//                                 onClick={() => handleViewClick(item)}
//                                 className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"

//                               >
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                 </svg>
//                                 View Details  
//                               </button>
                            
//                             </td>
//                           </tr>
//                         ))
//                       ) 
//                       }
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             {/* </div> */}
//             {!postRecords.length > 0 && (
//               <div className="flex flex-col items-center justify-center">
//                 <svg
//                   className="w-12 h-12 text-gray-300 mb-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   ></path>
//                 </svg>
//                 <p className="text-lg font-medium">No reported posts found</p>
//                 <p className="mt-1">No posts match your current search criteria.</p>
//               </div>
//             )}

//             {/* Pagination Footer */}
//             <CardFooter className="flex justify-between items-center border-t border-blue-gray-50 p-4 mt-1">
//               <Typography variant="small" color="blue-gray" className="font-normal">
//                 {t.showingPage} {currentPage} {t.of} {Math.ceil(totalRecords / pageSize)}
//               </Typography>
//               <div className="flex items-center gap-4">
//                 <div className="w-18 h-8 flex items-center justify-center rounded-[25px] border border-black">
//                   <Select
//                     key={selectKey}
//                     value={pageSize.toString()}
//                     onChange={handlePageSizeChange}
//                     containerProps={{ className: "min-w-[64px] h-full", }}
//                     className="w-full h-full text-sm border-0"
//                     labelProps={{ className: "hidden", }}
//                     menuProps={{ className: "z-50 border border-blue-gray-50", }}
//                   >
//                     {[5, 10, 15, 20, 25].map((size) => (
//                       <Option key={size} value={size.toString()} className="py-1 text-sm">
//                         {size}
//                       </Option>
//                     ))}
//                   </Select>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="outlined"
//                   disabled={currentPage === 1}
//                   className="rounded-[25px] border border-black"
//                   onClick={handlePreviousPage}
//                 >
//                   {t.previous}
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outlined"
//                   disabled={currentPage === totalPages}
//                   className="rounded-[25px] border border-black"
//                   onClick={handleNextPage}
//                 >
//                   {t.next}
//                 </Button>
//               </div>
//             </CardFooter>
//           </div>


//           {isPopupOpen && selectedPost && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 border border-red-900">
//               <div className="bg-white rounded-lg w-11/12 max-w-2xl max-h-[90vh] overflow-hidden flex flex-col   border border-red-900 ">
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg text-white">
//                 {/* <div className="flex justify-between items-center p-4 border-b bg-blue-gray-50"> */}
//                   <Typography variant="h5" color="blue-gray text-white">
//                     Post Details (ID: {selectedPost.postId})
//                   </Typography>
//                   {/* <IconButton
//                     variant="text"
//                     color="blue-gray"
//                     onClick={handleClosePopup}
//                   >
//                     <XMarkIcon className="h-5 w-5" />
//                   </IconButton> */}
//                   <button
//                     onClick={handleClosePopup}
//                     // className="absolute top-8 right-6 z-10 px-4 py-2 bg-transparent text-white rounded-lg hover:bg-blue-700 transition flex items-center"
//                     className="z-10 w-12 h-12 bg-transparent text-white rounded-full hover:bg-blue-900 transition flex items-center justify-center"
//                   >
//                     <span className="hover:scale-125">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke-width="1.5"
//                         stroke="currentColor"
//                         class="size-6"
//                       >
//                         <path
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           d="M6 18 18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </span>

//                     {/* Close */}
//                   </button>
//                 </div>

//                 {/* Modal Body */}
//                 <div className="flex flex-col md:flex-row gap-8 overflow-hidden p-4">
//                   {/* Image Carousel section */}
//                   <div className="w-full md:w-[45%] bg-white rounded-lg shadow-md hover:shadow-2xl p-4">
//                     <Typography variant="h6" className="mb-4 text-center">
//                       Post Images ({selectedPost.posts?.length || 0})
//                     </Typography>

//                     <Typography variant="paragraph" className="bg-white p-3 rounded-md">
//                       UserId: {selectedPost.userId}
//                       </Typography>

//                       <Typography variant="paragraph" className="bg-white p-3 rounded-md">
//                       UserName: {selectedPost.userName}
//                       </Typography>

//                     {selectedPost.posts && selectedPost.posts.length > 0 ? (
//                       <div className="relative">
//                         {/* Carousel container */}
//                         <div className="h-64 w-full relative border border-green-900">
//                           <img
//                             className="h-full w-full object-contain rounded-lg"
//                             src={selectedPost.posts[currentImageIndex].filePath}
//                             alt={`Post image ${currentImageIndex + 1}`}
//                           />
//                         </div>

//                         {/* Image counter */}
//                         <div className="absolute bottom-2 left-0 right-0 text-center">
//                           <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
//                             {currentImageIndex + 1} / {selectedPost.posts.length}
//                           </span>
//                         </div>

//                         {/* Navigation buttons */}
//                         {selectedPost.posts.length > 1 && (
//                           <>
//                             <button
//                               onClick={goToPrevImage}
//                               className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
//                             >
//                               <ChevronLeftIcon className="h-6 w-6" />
//                             </button>
//                             <button
//                               onClick={goToNextImage}
//                               className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
//                             >
//                               <ChevronRightIcon className="h-6 w-6" />
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     ) : (
//                       <div className="h-64 w-full flex items-center justify-center bg-gray-100 rounded-lg">
//                         <Typography>No post images found</Typography>
//                       </div>
//                     )}

//                     {/* Thumbnail indicators */}
//                     {selectedPost.posts && selectedPost.posts.length > 1 && (
//                       <div className="flex justify-center gap-1 mt-4 overflow-x-auto">
//                         {selectedPost.posts.map((_, index) => (
//                           <button
//                             key={index}
//                             onClick={() => setCurrentImageIndex(index)}
//                             className={`h-2 w-8 rounded-full transition-colors ${currentImageIndex === index
//                                 ? "bg-blue-500"
//                                 : "bg-gray-300"
//                               }`}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* User details section */}
//                   <div className="w-full md:w-[55%] p-4 bg-blue-gray-50/30 overflow-y-auto rounded-lg shadow-md hover:shadow-2xl" style={{ maxHeight: "70vh" }}>
//                     <Typography variant="h6" className="mb-4 text-center">
//                       Reported By
//                     </Typography>

//                     <div className="overflow-y-auto border border-yellow-500">
//                       <table className="w-full min-w-max table-auto text-left">
//                         <thead>
//                           <tr>
//                             <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
//                               <Typography variant="small" color="blue-gray" className="font-normal">
//                                 User ID
//                               </Typography>
//                             </th>
//                             <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
//                               <Typography variant="small" color="blue-gray" className="font-normal">
//                                 Username
//                               </Typography>
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {selectedPost.userDetails && selectedPost.userDetails.length > 0 ? (
//                             selectedPost.userDetails.map((user, index) => {
//                               const isLast = index === selectedPost.userDetails.length - 1;
//                               const classes = isLast
//                                 ? "p-4"
//                                 : "p-4 border-b border-blue-gray-50";
//                               return (
//                                 <tr key={index} className="even:bg-blue-gray-50/50">
//                                   <td className={classes}>
//                                     <Typography variant="small" color="blue-gray" className="font-bold">
//                                       {user.userId}
//                                     </Typography>
//                                   </td>
//                                   <td className={classes}>
//                                     <Typography variant="small" color="blue-gray" className="font-normal">
//                                       {user.username}
//                                     </Typography>
//                                   </td>
//                                 </tr>
//                               );
//                             })
//                           ) : (
//                             <tr>
//                               <td colSpan="2" className="p-4 text-center">
//                                 <Typography>No user reports found</Typography>
//                               </td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>

//                     <div className="mt-6   border border-yellow-500 ">
//                       <Typography variant="h6" className="mb-2">Post Description</Typography>
//                       <Typography variant="paragraph" className="bg-white p-3 rounded-md">
//                         {selectedPost.description}
//                       </Typography>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
   
//     </>
//   );
// };

// export default Report;









import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPostReportAction,
  setReportPostFiles,
  setRepotUserDetails,
} from "../../redux/slices/reportPostsSlice";
import { Link } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  NoSymbolIcon
} from "@heroicons/react/24/outline";

import {
  Card,
  CardFooter,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Tooltip,
  Input,
  Switch,
  IconButton,
  Select,
  Option,
} from "@material-tailwind/react";

const Report = () => {
  const {
    getAllpostReportLoadingStatus,
    getAllpostReportLoadingErrorMsg,
    getAllPostReportList,
  } = useSelector((state) => state.reportPost);
  const dispatch = useDispatch();

  useEffect(()=> {
    console.log(getAllPostReportList)
  })

  const reportPosts = getAllPostReportList.map((report) => ({
    userDetails: report.reportUserIds,
    posts: report.postWebModel.postFiles,
    postId: report.postWebModel.id,
    description: report.postWebModel.description,
    userId: report.postWebModel.userId,
    userName: report.postWebModel.userName,
    reportCount : report.reportUserIds[0].reportCount,
      reportPostId: report.reportDetails[0].reportPostId ,
      reportCreatedOn: report.reportDetails[0].createdOn
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [selectKey, setSelectKey] = useState(Date.now());

  // State for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  // State for carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // New states for action popup
  const [isActionPopupOpen, setIsActionPopupOpen] = useState(false);
  const [actionType, setActionType] = useState(null); // 'warning', 'deletion', 'suspension'
  const [violationReason, setViolationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const pageDetails = {
      pageNo: 1,
      pageSize: 10,
    };
    const valuess = dispatch(getAllPostReportAction(pageDetails));
    console.log("data is comming");
    console.log(valuess);
  }, []);

  const handleSearch = (e) => {
    console.log("name", e.target.value);
    setSearchName(e.target.value);
  };

  // Handle view button click
  const handleViewClick = (post) => {
    setSelectedPost(post);
    console.log(selectedPost);
    dispatch(setReportPostFiles(post.posts));
    dispatch(setRepotUserDetails(post.userDetails));
    setCurrentImageIndex(0); // Reset image index
    setIsPopupOpen(true);
  };



  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
  // Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPost(null);
    setCurrentImageIndex(0);
  };

  // Carousel navigation
  const goToNextImage = () => {
    if (selectedPost && selectedPost.posts) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedPost.posts.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const goToPrevImage = () => {
    if (selectedPost && selectedPost.posts) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedPost.posts.length - 1 : prevIndex - 1
      );
    }
  };

  // Action button handlers
  const handleActionClick = (post, action) => {
    console.log("Action clicked:", action, "for post:", post.postId); // Debug log
    setSelectedPost(post);
    setActionType(action);
    setViolationReason("");
    setIsActionPopupOpen(true);
  };

  const handleCloseActionPopup = () => {
    setIsActionPopupOpen(false);
    setSelectedPost(null);
    setActionType(null);
    setViolationReason("");
  };

  // API call for action
  const handleSubmitAction = async () => {
    if (!violationReason.trim()) {
      alert("Please enter a violation reason");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('jwt'); // Adjust the key name as per your implementation
      
      let deletePostSuspension;
      switch (actionType) {
        case 'warning':
          deletePostSuspension = 0;
          break;
        case 'deletion':
          deletePostSuspension = 1;
          break;
        case 'suspension':
          deletePostSuspension = 2;
          break;
        default:
          deletePostSuspension = 0;
      }

      const payload = {
         reportPostId: selectedPost.reportPostId,
        deletePostSuspension: deletePostSuspension,
        violationReason: violationReason.trim()
      };

      const response = await fetch('https://www.filmhooks.annulartech.net/report/updateReportsByDeleteAnsSuspension', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Adjust authorization header format as needed
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Action successful:', result);
        
        // Show success message
        alert(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} action completed successfully!`);
        
        // Refresh the data
        dispatch(getAllPostReportAction({ pageNo: 1, pageSize: 10 }));
        
        // Close the popup
        handleCloseActionPopup();
        // Close the main popup as well
        handleClosePopup();
      } else {
        const errorData = await response.json();
        console.error('Action failed:', errorData);
        alert(`Failed to process ${actionType}: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert(`Network error occurred while processing ${actionType}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fliterdReportPostList = reportPosts.filter(
    (post) => post.description.toLowerCase().includes(searchName.toLocaleLowerCase())
  );

  const totalRecords = fliterdReportPostList.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const lastIndex = currentPage * pageSize;
  const firstIndex = lastIndex - pageSize;
  const postRecords = fliterdReportPostList.slice(firstIndex, lastIndex);
  
  // Pagination handlers
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

  const handlePageSizeChange = (value) => {
    setPageSize(Number(value));
    setCurrentPage(1);
    setSelectKey(Date.now());
  };

  const TABLE_HEAD = ["Post Id", "Description", "Report Count", "Actions"];

  const t = {
    showingPage: "Showing Page",
    of: "of",
    previous: "Previous",
    next: "Next"
  };

  const getActionTitle = () => {
    switch (actionType) {
      case 'warning':
        return 'Issue Warning';
      case 'deletion':
        return 'Permanent Deletion';
      case 'suspension':
        return 'Account Suspension';
      default:
        return 'Action';
    }
  };

  const getActionColor = () => {
    switch (actionType) {
      case 'warning':
        return 'from-yellow-500 to-orange-500';
      case 'deletion':
        return 'from-red-500 to-red-700';
      case 'suspension':
        return 'from-purple-500 to-purple-700';
      default:
        return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <>
      <div className="p-1 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-screen">
          {/* Header Section with Gradient Text */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Reports
            </h1>
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-100 bg-gray-50 ">
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
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl p-4">
            
            {/* Table Content */}
              {getAllpostReportLoadingErrorMsg && (
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Error Loading Data</h3>
                  <p className="mt-2 text-gray-600">{getAllpostReportLoadingErrorMsg}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-150"
                    onClick={() => dispatch(getAllPostReportAction({ pageNo: 1, pageSize: 10 }))}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!getAllpostReportLoadingErrorMsg && (
                <div className="overflow-x-auto block max-h-[400px]">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
                        {TABLE_HEAD.map((head, index) => (
                          <th key={index} className="py-3 px-4 text-left font-medium text-white whitespace-nowrap z-10">
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                      {postRecords.length > 0 && (
                        postRecords.map((item, index) => (
                          <tr
                            key={index}
                            className={`border-b border-gray-100 transition-colors duration-200 hover:bg-indigo-50 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
                          >
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <span className="font-medium text-gray-800">{index + 1}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6">
                              <p className="text-gray-800 line-clamp-2">
                                {item.description || "No description provided"}
                              </p>
                            </td>
                            <td className="py-3 px-6">
                              <div className="flex items-center">
                                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 font-medium text-xs mr-2">
                                  {item.reportCount}
                                </span>
                                <span className="text-gray-600 text-sm">reports</span>
                              </div>
                            </td>
                            <td className="py-3 px-6">
                              <div className="flex gap-2 flex-wrap">
                                {/* Only View Details Button in table */}
                                <button
                                  onClick={() => handleViewClick(item)}
                                  className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                                >
                                  <EyeIcon className="h-3 w-3 mr-1" />
                                  View Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            {!postRecords.length > 0 && (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <p className="text-lg font-medium">No reported posts found</p>
                <p className="mt-1">No posts match your current search criteria.</p>
              </div>
            )}

            {/* Pagination Footer */}
            <CardFooter className="flex justify-between items-center border-t border-blue-gray-50 p-4 mt-1">
              <Typography variant="small" color="blue-gray" className="font-normal">
                {t.showingPage} {currentPage} {t.of} {Math.ceil(totalRecords / pageSize)}
              </Typography>
              <div className="flex items-center gap-4">
                <div className="w-18 h-8 flex items-center justify-center rounded-[25px] border border-black">
                  <Select
                    key={selectKey}
                    value={pageSize.toString()}
                    onChange={handlePageSizeChange}
                    containerProps={{ className: "min-w-[64px] h-full", }}
                    className="w-full h-full text-sm border-0"
                    labelProps={{ className: "hidden", }}
                    menuProps={{ className: "z-50 border border-blue-gray-50", }}
                  >
                    {[5, 10, 15, 20, 25].map((size) => (
                      <Option key={size} value={size.toString()} className="py-1 text-sm">
                        {size}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Button
                  size="sm"
                  variant="outlined"
                  disabled={currentPage === 1}
                  className="rounded-[25px] border border-black"
                  onClick={handlePreviousPage}
                >
                  {t.previous}
                </Button>
                <Button
                  size="sm"
                  variant="outlined"
                  disabled={currentPage === totalPages}
                  className="rounded-[25px] border border-black"
                  onClick={handleNextPage}
                >
                  {t.next}
                </Button>
              </div>
            </CardFooter>
          </div>

          {/* View Details Popup */}
          {isPopupOpen && selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg text-white">
                  <Typography variant="h5" className="text-white">
                    Post Details (ID: {selectedPost.postId})
                  </Typography>
                  <button
                    onClick={handleClosePopup}
                    className="z-10 w-12 h-12 bg-transparent text-white rounded-full hover:bg-blue-900 transition flex items-center justify-center"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>









                {/* Modal Body */}
                <div className="flex flex-col md:flex-row gap-8 overflow-hidden p-4">
                  {/* Image Carousel section */}
                  <div className="w-full md:w-[45%] bg-white rounded-lg shadow-md hover:shadow-2xl p-4 border border-green-900 ">
                    <Typography variant="h6" className="mb-4 text-center">
                      Post Images ({selectedPost.posts?.length || 0})
                    </Typography>

                    <Typography variant="paragraph" className="bg-white p-3 rounded-md">
                      UserId: {selectedPost.userId}
                    </Typography>

                    <Typography variant="paragraph" className="bg-white p-3 rounded-md">
                      UserName: {selectedPost.userName}
                    </Typography>

                      {/* Fixed: Show Post Created Date */}
  <Typography variant="paragraph" className="bg-white p-3 rounded-md">
    Post Created On: {selectedPost.posts && selectedPost.posts.length > 0
      ? formatDate(selectedPost.posts[0].createdOn)
      : 'N/A'}
  </Typography>
  
  {/* Added: Show Report Created Date */}
  {/* <Typography variant="paragraph" className="bg-white p-3 rounded-md">
    Report Created On: {selectedPost.reportCreatedOn 
      ? formatDate(selectedPost.reportCreatedOn)
      : 'N/A'}
  </Typography> */}


                    {selectedPost.posts && selectedPost.posts.length > 0 ? (
                      <div className="relative">
                        {/* Carousel container */}
                        <div className="h-64 w-full relative border border-green-900">
                          <img
                            className="h-full w-full object-contain rounded-lg"
                            src={selectedPost.posts[currentImageIndex].filePath}
                            alt={`Post image ${currentImageIndex + 1}`}
                          />
                        </div>

                        {/* Image counter */}
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                            {currentImageIndex + 1} / {selectedPost.posts.length}
                          </span>
                        </div>

                        {/* Navigation buttons */}
                        {selectedPost.posts.length > 1 && (
                          <>
                            <button
                              onClick={goToPrevImage}
                              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                            >
                              <ChevronLeftIcon className="h-6 w-6" />
                            </button>
                            <button
                              onClick={goToNextImage}
                              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75"
                            >
                              <ChevronRightIcon className="h-6 w-6" />
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="h-64 w-full flex items-center justify-center bg-gray-100 rounded-lg">
                        <Typography>No post images found</Typography>
                      </div>
                    )}

                    {/* Thumbnail indicators */}
                    {selectedPost.posts && selectedPost.posts.length > 1 && (
                      <div className="flex justify-center gap-1 mt-4 overflow-x-auto">
                        {selectedPost.posts.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 w-8 rounded-full transition-colors ${currentImageIndex === index
                                ? "bg-blue-500"
                                : "bg-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  {/* User details section */}
                  <div className="w-full md:w-[55%] p-4 bg-blue-gray-50/30 overflow-y-auto rounded-lg shadow-md hover:shadow-2xl" style={{ maxHeight: "70vh" }}>
                    <Typography variant="h6" className="mb-4 text-center">
                      Reported By
                    </Typography>

                    <div className="overflow-y-auto border border-yellow-500">
                      <table className="w-full min-w-max table-auto text-left">
                        <thead>
                          <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                User ID
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                                Username
                              </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                               Reported Date
                              </Typography>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPost.userDetails && selectedPost.userDetails.length > 0 ? (
                            selectedPost.userDetails.map((user, index) => {
                              const isLast = index === selectedPost.userDetails.length - 1;
                              const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                              return (
                                <tr key={index} className="even:bg-blue-gray-50/50">
                                  <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                      {user.userId}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                      {user.username}
                                    </Typography>
                                  </td>

                                    <td className={classes}>
                                    {/* Added: Show Report Created Date */}
  <Typography variant="paragraph" className="bg-white p-3 rounded-md">
    {selectedPost.reportCreatedOn 
      ? formatDate(selectedPost.reportCreatedOn)
      : 'N/A'}
  </Typography>
                                  </td>

                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="2" className="p-4 text-center">
                                <Typography>No user reports found</Typography>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 border border-yellow-500">
                      <Typography variant="h6" className="mb-2">Post Description</Typography>
                      <Typography variant="paragraph" className="bg-white p-3 rounded-md">
                        {selectedPost.description}
                      </Typography>
                    </div>

                    {/* Action Buttons in Popup */}
                    <div className="mt-6 border border-yellow-500 p-4 bg-white rounded-lg">
                      <Typography variant="h6" className="mb-4 text-center">
                        Take Action
                      </Typography>
                      <div className="flex flex-col gap-3">
                        {/* Warning Button */}
                        <button
                          onClick={() => {
                            console.log("Warning button clicked"); // Debug log
                            handleActionClick(selectedPost, 'warning');
                          }}
                          className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                        >
                          <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                          Issue Warning
                        </button>
                        
                        {/* Permanent Deletion Button */}
                        <button
                          onClick={() => {
                            console.log("Deletion button clicked"); // Debug log
                            handleActionClick(selectedPost, 'deletion');
                          }}
                          className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                        >
                          <TrashIcon className="h-5 w-5 mr-2" />
                          Permanent Deletion
                        </button>
                        
                        {/* Suspension Button */}
                        <button
                          onClick={() => {
                            console.log("Suspension button clicked"); // Debug log
                            handleActionClick(selectedPost, 'suspension');
                          }}
                          className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                        >
                          <NoSymbolIcon className="h-5 w-5 mr-2" />
                          Account Suspension
                        </button>
                      </div>
                    </div>
                  </div>








                </div>





































              </div>
            </div>
          )}

          {/* Action Confirmation Popup - Fixed z-index and positioning */}
          {isActionPopupOpen && selectedPost && actionType && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
              <div className="bg-white rounded-lg w-11/12 max-w-md overflow-hidden flex flex-col shadow-2xl">
                {/* Modal Header */}
                <div className={`flex justify-between items-center p-4 border-b bg-blue-400 rounded-t-lg text-white`}>
                  <Typography variant="h5" className="text-white font-bold">
                    {getActionTitle()}
                  </Typography>
                  <button
                    onClick={handleCloseActionPopup}
                    className="z-10 w-8 h-8 bg-transparent text-white rounded-full hover:bg-white hover:bg-opacity-20 transition flex items-center justify-center"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="mb-4">
                    <Typography variant="small" className="text-gray-600 mb-2">
                      Post ID: <span className="font-semibold">{selectedPost.postId}</span>
                    </Typography>
                    <Typography variant="small" className="text-gray-600 mb-4">
                      You are about to {actionType === 'warning' ? 'issue a warning for' : actionType === 'deletion' ? 'permanently delete' : 'suspend the account for'} this post.
                    </Typography>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="violationReason" className="block text-sm font-medium text-gray-700 mb-2">
                      Violation Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="violationReason"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                      placeholder={`Enter the reason for ${actionType}...`}
                      value={violationReason}
                      onChange={(e) => setViolationReason(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCloseActionPopup}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-150 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitAction}
                      disabled={isSubmitting || !violationReason.trim()}
                      className={`flex-1 px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 ${
                        actionType === 'warning' 
                          ? 'bg-blue-500 hover:bg-blue-400 focus:ring-blue-500' 
                          : actionType === 'deletion'
                          ? 'bg-blue-600 hover:bg-blue-400 focus:ring-blue-500'
                          : 'bg-blue-600 hover:bg-blue-400 focus:ring-blue-500'
                      }`}
                    >
                      {isSubmitting ? 'Processing...' : `Confirm ${getActionTitle()}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;