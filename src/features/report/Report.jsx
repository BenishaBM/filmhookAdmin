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
  ChevronRightIcon
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
} from "@material-tailwind/react";
import Pagination from "../../component/Pagination";

const Report = () => {
  const {
    getAllpostReportLoadingStatus,
    getAllpostReportLoadingErrorMsg,
    getAllPostReportList,
  } = useSelector((state) => state.reportPost);
  const dispatch = useDispatch();

  const reportPosts = getAllPostReportList.map((report) => ({
    userDetails: report.reportUserIds,
    posts: report.postWebModel.postFiles,
    postId: report.postWebModel.id,
    description: report.postWebModel.description,
    reportCount: report.reportUserIdCount,
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");


  // State for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  // State for carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0); //newchanges



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
    // Store the selected post data in state
    setSelectedPost(post);
    console.log(selectedPost);
    // Store the data in Redux as before
    dispatch(setReportPostFiles(post.posts));
    dispatch(setRepotUserDetails(post.userDetails));
    // Open the popup
    setIsPopupOpen(true);
  };    // new changes


   // Close popup
   const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPost(null);
  }; //newchanges


    // Carousel navigation
    const goToNextImage = () => {
      if (selectedPost && selectedPost.posts) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === selectedPost.posts.length - 1 ? 0 : prevIndex + 1
        );
      }
    }; //newchanges


    const goToPrevImage = () => {
      if (selectedPost && selectedPost.posts) {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? selectedPost.posts.length - 1 : prevIndex - 1
        );
      }
    };  // newchanges



  const fliterdReportPostList = reportPosts.filter(
    (post) => post.description.toLowerCase().includes(searchName.toLocaleLowerCase())
  );

  const recordsPerPage = 10;
  const totalPages = Math.ceil(
    fliterdReportPostList.length / recordsPerPage
  );
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const postRecords = fliterdReportPostList.slice(firstIndex, lastIndex);
  const handlePageClicked = (page) => {
    setCurrentPage(page);
  };
  const renderPagination = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pageNumbers;
  };

  const TABLE_HEAD = ["Post Id", "Description", "Report Count", "Actions"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Gradient Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Reports
          </h1>
          {/* <p className="mt-2 text-gray-600">
            Review and manage reported content
          </p> */}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl ">
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

          {/* Table Content */}
          <div className="overflow-x-auto">
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
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    {TABLE_HEAD.map((head, index) => (
                      <th key={index} className="py-4 px-6 text-left font-semibold">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {postRecords.length > 0 ? (
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
                          {/* <Link
                            to={`/layout/report_post/${item.postId}`}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
                            onClick={() => {
                              dispatch(setReportPostFiles(item.posts));
                              dispatch(setRepotUserDetails(item.userDetails));
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            
                          </Link> */}
                          <button
                            onClick={() => handleViewClick(item)}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"

                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details  
                          </button>
                          {/* newchanges */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 px-6 text-center text-gray-500">
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
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-center">
              <Pagination
                pagenumbers={renderPagination}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageClicked={handlePageClicked}
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Total Reports</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {reportPosts.reduce((sum, post) => sum + post.reportCount, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Reported Posts</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {reportPosts.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Current Page</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {currentPage} / {totalPages || 1}
            </p>
          </div>
        </div> */}

       {/* newchanges */}

        {isPopupOpen && selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-11/12 max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b bg-blue-gray-50">
                <Typography variant="h5" color="blue-gray">
                  Post Details (ID: {selectedPost.postId})
                </Typography>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={handleClosePopup}
                >
                  <XMarkIcon className="h-5 w-5" />
                </IconButton>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col md:flex-row gap-8 overflow-hidden p-4">
                {/* Image Carousel section */}
                <div className="w-full md:w-[45%] bg-white rounded-lg shadow-md p-4">
                  <Typography variant="h6" className="mb-4 text-center">
                    Post Images ({selectedPost.posts?.length || 0})
                  </Typography>

                  {selectedPost.posts && selectedPost.posts.length > 0 ? (
                    <div className="relative">
                      {/* Carousel container */}
                      <div className="h-64 w-full relative">
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
                <div className="w-full md:w-[55%] p-4 bg-blue-gray-50/30 overflow-y-auto rounded-lg shadow-md" style={{ maxHeight: "70vh" }}>
                  <Typography variant="h6" className="mb-4 text-center">
                    Reported By
                  </Typography>

                  <div className="overflow-y-auto">
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

                  <div className="mt-6">
                    <Typography variant="h6" className="mb-2">Post Description</Typography>
                    <Typography variant="paragraph" className="bg-white p-3 rounded-md">
                      {selectedPost.description}
                    </Typography>
                  </div>

                  {/* <div className="flex justify-center gap-4 mt-6">
                    <Button color="red" size="sm">
                      Delete Post
                    </Button>
                    <Button color="gray" size="sm">
                      Dismiss Reports
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;