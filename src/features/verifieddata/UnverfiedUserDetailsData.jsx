
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getUnverifiedProfileFilesAction,
// } from "../../redux/slices/notVerifiedIndustrialUserSlice";
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { Button } from "@material-tailwind/react";
// import DialogBox from "../../component/VideoBox";
// import ImageDialog from "../../component/ImageDialog";
// import UserDetailsTable from "../industiralUser/UserDetailTable";
// import { approveUnverifiedInductrialUserProfile } from "../../api/industrialUser";
// import Userinfo from "../industiralUser/Userinfo";
// import privateAPI from "../../api/privateApi";

// const UnverfiedUserDetailsData = ({userId}) => {
//   const dispatch = useDispatch();
 
//   const {
//     unverifiedIndestiraluserDetails,
//     getDetailsLoadingStatus,
//     getDetailsErrorMessage,
//     unverifiedUserFiles,
//     unverifiedUserFilesLoadingStatus,
//     unverifiedUserFilesErrorMessage,
//   } = useSelector((state) => state.industrialUser);

//   const [openDialogBox, setopenDialogBox] = useState(false);
//   const [urls, seturls] = useState(null);
//   const [fileType, setFileType] = useState(null);
//   const [openReview, setopenReview] = useState(false);
//   const [review, setReview] = useState("");
//   const [activeTab, setActiveTab] = useState("profile");

//   const handleOpenReviewBox = () => setopenReview(!openReview);

//   const fetchUserFiles = async (userId) => {
//     setUnverifiedUserFilesLoadingStatus(true);
//     try {
//       // Get token from localStorage
//       const token = localStorage.getItem('jwt');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }
      
//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/industryUser/getIndustryFilesByUserId?userId=${userId}`, 
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch user files');
//       }
      
//       const result = await response.json();
      
//       if (result.status === 1) {
//         setUnverifiedUserFiles(result.data || []);
//       } else {
//         throw new Error(result.message || 'Failed to fetch user files');
//       }
//     } catch (err) {
//       setUnverifiedUserFilesErrorMessage(err.message);
//       toast.error("Error fetching user files");
//     } finally {
//       setUnverifiedUserFilesLoadingStatus(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       dispatch(getUnverifiedIndustrialUserDetailsAction(userId));
//       fetchUserFiles(userId);
//     }
//   }, [userId, dispatch]);
//   const handleReviewChange = (e) => {
//     const value = e.target.value;
//     if (value >= 1 && value <= 10) {
//       setReview(value);
//     } else if (value < 1) {
//       setReview(1);
//     } else if (value > 10) {
//       setReview(10);
//     }
//   };

//   const records = unverifiedIndestiraluserDetails.Data
//     ? unverifiedIndestiraluserDetails.Data.flatMap((industry, industryIndex) =>
//       (industry.platformDetails || []).flatMap((platform, platformIndex) =>
//         (platform.professionDetails || []).map(
//           (profession, professionIndex) => ({
//             id: `${industryIndex}-${platformIndex}-${professionIndex}`,
//             industryName: industry.industriesName,
//             platformName: platform.platformName,
//             professionName: profession.professionName,
//             filmCount: platform.filmCount,
//             netWorth: platform.netWorth,
//             dailySalary: platform.dailySalary,
//             userId: industry.iupdId,
//             subproffession: profession.subProfessionName  // changing 28
//           })
//         )
//       )
//     )
//     : [];




//   const handleAadharcardDialog = () => {
//     console.log(unverifiedUserFiles)
//     setFileType("image");
//     setopenDialogBox(!openDialogBox);
//     // const aadharCardFile = unverifiedUserFiles.find(
//     //   (file) => file.category === "AadhaarCard" || "PanCard"

//     // );

//     const aadharCardFile = unverifiedUserFiles.filter(
//       (file) => file.category === "AadhaarCard" || file.category === "PanCard"
//     );
//     console.log(aadharCardFile)

//     const filePaths = aadharCardFile.map(file => file.filePath);

//     seturls(filePaths);
//     console.log(urls)
//   };

//   const handleImageDialog = () => {
//     console.log(unverifiedUserFiles)
//     setFileType("image");
//     setopenDialogBox(!openDialogBox);


//     const imageCardFile = unverifiedUserFiles.filter(
//       (file) => file.category === "Image"
//     );
//     console.log(imageCardFile)

//     const imageCardFilePath = imageCardFile.map(file => file.filePath);

//     seturls(imageCardFilePath);
//     console.log(urls)
//   };

  
//   const handlevideoDialog = () => {
//     setFileType("video");
//     setopenDialogBox(!openDialogBox);

//     const videoCardFile = unverifiedUserFiles.filter(
//       (file) => file.category === "Video"
//     );

//     const videoCardFilePath = videoCardFile.map(file => file.filePath);

//     seturls(videoCardFilePath);
//     console.log("Setting urls to:", videoCardFilePath); // correct logging
//   };


//   // oneminute video dialogue
//   const handleOneminutevideoDialog = () => {
//     setFileType("oneminutevideo");
//     setopenDialogBox(!openDialogBox);

//     const oneminutevideoCardFile = unverifiedUserFiles.filter(
//       (file) => file.category === "oneMinuteVideo"
//     );

//     const oneminutevideoCardFilePath = oneminutevideoCardFile.map(file => file.filePath);

//     seturls(oneminutevideoCardFilePath);
//     console.log("Setting urls to:", oneminutevideoCardFilePath); // correct logging
//   };


//   const handelRejectProfile = async () => {
//     const details = {
//       userId: userId,
//       status: true,
//       adminReview: 0,
//     };
//     const data = await approveUnverifiedInductrialUserProfile(details);
//     if (data.message === "Success") {
//       toast.error("Profile rejected successfully")
//     }
//   };

//   const handelApproveProfile = async () => {
//     const details = {
//       userId: userId,
//       status: false,
//       adminReview: review,
//     };
//     const data = await approveUnverifiedInductrialUserProfile(details);
//     if (data.message === "Success") {
//       toast.success("Profile approved successfully")
//     }
//     handleOpenReviewBox();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Header Card */}
//       <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
//         <div className="px-6 pb-6 relative">
//           <div className="flex flex-col md:flex-row items-center md:items-end">
//             <div className="-mt-16 relative">
//               {/* <img
//                 src={unverifiedIndestiraluserDetails.profilePicturePath || "/api/placeholder/120/120"}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg"
//               /> */}

//               {/* static image changes is required */}
//               <img src="https://media.istockphoto.com/id/1225585631/photo/5g-communications-tower-with-man-using-mobile-phone.jpg?s=612x612&w=0&k=20&c=3guCR-COMpYY2OMSYMch__63i2ywVH2YNa-Bs-pAhNQ=" alt="onlineimg"
//                 className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg" />
//               <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-yellow-400 border-2 border-white"></div>
//             </div>
//             <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {unverifiedIndestiraluserDetails?.userInfo?.name || "User Profile"}
//               </h1>
//               <p className="text-gray-500">Unverified Industrial User</p>
//             </div>
//             <div className="flex-grow"></div>
//             <div className="mt-6 md:mt-0 flex space-x-3">
//               <button onClick={handleOpenReviewBox} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center shadow-md">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 Approve
//               </button>
//               <button onClick={handelRejectProfile} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center shadow-md">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
//         <div className="flex border-b">
//           <button
//             className={`px-6 py-4 flex items-center ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//             </svg>
//             Profile Info
//           </button>
//           <button
//             className={`px-6 py-4 flex items-center ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('documents')}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//             </svg>
//             Documents
//           </button>


//           {/* i am adding oneminute video to this tab */}


//           <button
//             className={`px-6 py-4 flex items-center ${activeTab === 'oneminutevideo' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('oneminutevideo')}
//           >
//             <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//             </svg>
//             One-Minute Video
//           </button>
//           {/* profession tab */}
//           <button
//             className={`px-6 py-4 flex items-center ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('profession')}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//             </svg>
//             Professionals
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="p-6">
//           {activeTab === 'profession' && (
//             <div>
//               <UserDetailsTable records={records} />
//             </div>
//           )}

//           {activeTab === "profile" && (
//             <div>
//               <Userinfo> </Userinfo>
//             </div>

//           )

//           }


//           {activeTab === 'documents' && (
//             <div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div
//                   onClick={handleAadharcardDialog}
//                   className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                 >
//                   <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
//                     <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800">Aadhar Card / PAN Card</h3>
//                     <p className="text-sm text-gray-500">View identification documents</p>
//                   </div>
//                 </div>

//                 <div
//                   onClick={handleImageDialog}
//                   className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                 >
//                   <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mr-4">
//                     <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800">Projects Images</h3>
//                     <p className="text-sm text-gray-500">View project portfolio images</p>
//                   </div>
//                 </div>

//                 <div
//                   onClick={handlevideoDialog}
//                   className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                 >
//                   <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg mr-4">
//                     <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800">Project Videos</h3>
//                     <p className="text-sm text-gray-500">View video demonstrations</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* oneminute-video condition  */}
//           {activeTab === 'oneminutevideo' && (
//             <div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div
//                   onClick={handleOneminutevideoDialog}
//                   className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                 >
//                   <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg mr-4">
//                     <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-800">One-Minute Video</h3>
//                     <p className="text-sm text-gray-500">View Video Demonstration </p>
//                   </div>
//                 </div>




//               </div>
//             </div>
//           )}



//         </div>
//       </div>

//       {/* File Preview Dialogs */}
//       {fileType === "video" && (
//         <DialogBox
//           openDialogBox={openDialogBox}
//           setopenDialogBox={setopenDialogBox}
//           urls={urls}
//         />
//       )}

//       {fileType === "image" && (
//         <ImageDialog
//           openDialogBox={openDialogBox}
//           setopenDialogBox={setopenDialogBox}
//           urls={urls}
//         />
//       )}

//       {fileType === "oneminutevideo" && (
//         <DialogBox
//           openDialogBox={openDialogBox}
//           setopenDialogBox={setopenDialogBox}
//           urls={urls}
//         />
//       )}
//       {/* both video and oneminute video popup are in videobox components */}

//       {/* Review Dialog */}
//       <div className={`fixed inset-0 z-50 overflow-y-auto ${openReview ? 'flex' : 'hidden'} items-center justify-center`}>
//         <div className="fixed inset-0 bg-black opacity-50" onClick={handleOpenReviewBox}></div>
//         <div className="bg-white rounded-lg w-full max-w-md mx-auto z-50 overflow-hidden">
//           <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//             <h3 className="text-lg font-medium">Approval Rating</h3>
//             <p className="text-sm opacity-80">Rate this profile from 1-10</p>
//           </div>
//           <div className="p-6">
//             <div className="flex flex-col mb-6">
//               <label className="mb-2 font-medium text-gray-700">Rating (1-10)</label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={review}
//                   onChange={handleReviewChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <div className="absolute right-0 inset-y-0 flex items-center pr-3">
//                   <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <button
//                 onClick={handleOpenReviewBox}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handelApproveProfile}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//               >
//                 Submit Rating
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnverfiedUserDetailsData;






















//////the most most main working code -------------------------do not miss it-------------------------------------------

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUnverifiedIndustrialUserDetailsAction } from "../../redux/slices/notVerifiedIndustrialUserSlice";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import DialogBox from "../../component/VideoBox";
import ImageDialog from "../../component/ImageDialog";
import UserDetailsTable from "../industiralUser/UserDetailTable";
import { approveUnverifiedInductrialUserProfile } from "../../api/industrialUser";
import UserinfoForList from "./UserinfoForList"

const UnverfiedUserDetailsData = ({ userId }) => {
  const dispatch = useDispatch();
 
  const {
    unverifiedIndestiraluserDetails,
    getDetailsLoadingStatus,
    getDetailsErrorMessage,
  } = useSelector((state) => state.industrialUser);

  const [openDialogBox, setopenDialogBox] = useState(false);
  const [urls, seturls] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [openReview, setopenReview] = useState(false);
  const [review, setReview] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [unverifiedUserFiles, setUnverifiedUserFiles] = useState([]);
  const [unverifiedUserFilesLoadingStatus, setUnverifiedUserFilesLoadingStatus] = useState(false);
  const [unverifiedUserFilesErrorMessage, setUnverifiedUserFilesErrorMessage] = useState(null);

  

  const handleOpenReviewBox = () => setopenReview(!openReview);

  // Function to fetch files directly using the API
  const fetchUserFiles = async (userId) => {
    setUnverifiedUserFilesLoadingStatus(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('jwt');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(
        `https://www.filmhooks.annulartech.net/industryUser/getIndustryFilesByUserId?userId=${userId}`, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        // throw new Error('Failed to fetch user files');
      }
      
      const result = await response.json();
      
      if (result.status === 1) {
        setUnverifiedUserFiles(result.data || []);
        console.log("Files fetched successfully:", result.data);
      } else {
        // throw new Error(result.message || 'Failed to fetch user files');
      }
    } catch (err) {
      setUnverifiedUserFilesErrorMessage(err.message);
    //   toast.error("Error fetching user files");
      console.error("Error fetching files:", err);
    } finally {
      setUnverifiedUserFilesLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUnverifiedIndustrialUserDetailsAction(userId));
      fetchUserFiles(userId);
    }
  }, [userId, dispatch]);

  const handleReviewChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 10) {
      setReview(value);
    } else if (value < 1) {
      setReview(1);
    } else if (value > 10) {
      setReview(10);
    }
  };

  const records = unverifiedIndestiraluserDetails.Data
    ? unverifiedIndestiraluserDetails.Data.flatMap((industry, industryIndex) =>
      (industry.platformDetails || []).flatMap((platform, platformIndex) =>
        (platform.professionDetails || []).map(
          (profession, professionIndex) => ({
            id: `${industryIndex}-${platformIndex}-${professionIndex}`,
            industryName: industry.industriesName,
            platformName: platform.platformName,
            professionName: profession.professionName,
            filmCount: platform.filmCount,
            netWorth: platform.netWorth,
            dailySalary: platform.dailySalary,
            userId: industry.iupdId,
            subproffession: profession.subProfessionName
          })
        )
      )
    )
    : [];

  const handleAadharcardDialog = () => {
    setFileType("image");
    setopenDialogBox(!openDialogBox);

    const idCardFiles = unverifiedUserFiles.filter(
      (file) => file.category === "AadhaarCard" || file.category === "PanCard" || file.category === "govermentId"
    );

    const filePaths = idCardFiles.map(file => file.filePath);
    seturls(filePaths);
  };

  const handleImageDialog = () => {
    setFileType("image");
    setopenDialogBox(!openDialogBox);

    const imageFiles = unverifiedUserFiles.filter(
      (file) => file.category === "Image"
    );

    const imageFilePaths = imageFiles.map(file => file.filePath);
    seturls(imageFilePaths);
  };



  // Update the handleGovermentidDialog function
const handleGovermentidDialog = () => {
    setFileType("image"); // Change from "govermentId" to "image" to use the ImageDialog component properly
    setopenDialogBox(!openDialogBox);
  
    // Filter for government ID files
    const govIdFiles = unverifiedUserFiles.filter(
      (file) => file.category === "govermentId"
    );
    
    console.log("Government ID files:", govIdFiles);
    
    // Extract file paths
    const govIdFilePaths = govIdFiles.map(file => file.filePath);
    seturls(govIdFilePaths);
  };



  const handlevideoDialog = () => {
    setFileType("video");
    setopenDialogBox(!openDialogBox);

    const videoFiles = unverifiedUserFiles.filter(
      (file) => file.category === "Video"
    );

    const videoFilePaths = videoFiles.map(file => file.filePath);
    seturls(videoFilePaths);
  };

  const handleOneminutevideoDialog = () => {
    setFileType("video");
    setopenDialogBox(!openDialogBox);

    const oneminutevideoFiles = unverifiedUserFiles.filter(
      (file) => file.category === "oneMinuteVideo"
    );

    const oneminutevideoFilePaths = oneminutevideoFiles.map(file => file.filePath);
    seturls(oneminutevideoFilePaths);
  };

  const handelRejectProfile = async () => {
    try {
      const details = {
        userId: userId,
        status: true,
        adminReview: 0,
      };
      const data = await approveUnverifiedInductrialUserProfile(details);
      if (data.message === "Success") {
        toast.error("Profile rejected successfully");
      }
    } catch (error) {
      toast.error("Failed to reject profile");
      console.error("Error rejecting profile:", error);
    }
  };

  const handelApproveProfile = async () => {
    try {
      const details = {
        userId: userId,
        status: false,
        adminReview: review,
      };
      const data = await approveUnverifiedInductrialUserProfile(details);
      if (data.message === "Success") {
        toast.success("Profile approved successfully");
      }
      handleOpenReviewBox();
    } catch (error) {
      toast.error("Failed to approve profile");
      console.error("Error approving profile:", error);
    }
  };

  // Function to render file counts by category
  const getFileCounts = () => {
    const counts = {
      id: unverifiedUserFiles.filter(file => 
        ["AadhaarCard", "PanCard", "govermentId"].includes(file.category)).length,
      image: unverifiedUserFiles.filter(file => file.category === "Image").length,
      video: unverifiedUserFiles.filter(file => file.category === "Video").length,
      oneMinuteVideo: unverifiedUserFiles.filter(file => file.category === "oneMinuteVideo").length
    };
    return counts;
  };

  const fileCounts = getFileCounts();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="-mt-16 relative">
              {/* Profile Image */}
              <img 
                src={unverifiedUserFiles.find(file => file.category === "Image")?.filePath || 
                     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEUAAAD////7+/v29vbf39/n5+fs7OzIyMiJiYnBwcGlpaWUlJSXl5fw8PDLy8vQ0NAfHx9fX1+wsLA3NzcmJiYWFhaAgIBycnJNTU0NDQ24uLhDQ0NkZGR6enpSUlJaWlouLi60qsLoAAAFZElEQVR4nM2c65qyOgyFq4AcFFAEOTp6/1e5mfFzz1DakqSxsP4PzzttSdJkodjZaR9k8fFyLSvRVuV1OMbZwfKJo4QVkX8aeiGpHxJ/PSj/9CUDvfVIglWgDserDulnvU6pc6j0ZCJ6KfHcQmXGVXrrK3cI5d0gSN860haLAOUPUCYhatKBx0PlFZxJiJISHtBQ8RnDJMQ1+zxUjEP6Fv64I6Fi1N79Wys0FQ4qR+7dS2fsaUdBBQ2FSYgGSYWCutCYxsjwOShAatGp+BRUTmcST1S4QkBpCxWIUBsIhypsmITAxFAwVDArMXF6IHIzGMpyoYQI+aE8Yoj6VcMPlbW2UC0820ChwHWdXiduqMPTHqoBH3UgVGjPJCrwUQdCMezeeL1hhgLdXpZ054XiOFJjtQe9n8KgQuuA8C1wsQeD6jiYRAWNVDCohAUKXFXBoI48UNDwCYNiiQjjLZ4Tal/zQEWsUIjugTuoLa7UJs/ULuKB4n37mOIUNCPDoKwL9B+10NoFBkVoACnEnPt8UrdFVgkdRrispwZoPQyEYome3JUnS+3SMUMFDEw9eL4FhOJINPc9MxTH/sGbCVCo4GnL9IS3XcBdF4ve4kuIDiMYyrdcqidijAvv5FlWCphWLBzK7kLag189FJTVCwguELBQNpV6hFkoVHM/JaflHjchRY1BsLO+t0rkHAs3xSJWoKgDhYYi3d9bcMlChKJQoZnwM2R0DIU3helQ2OsWuLKzgtoViMhwjQlMJAeHD54dPWimJZLXJY1APdCKasEhuoIywETyQvZ2kf1ThRmrvZBOkyXULu0u2k2shphsnrKCGuUXD8WbeB0KS1OeFdRu5/nd6fLHalIOpy6wWSQMlOfned4loa+ui/ZBnmW+liYd/zQeH6D5axKUl0WP92pQXqmw+V1HH7KMi1BpIRWcNRIrn76m7T1c5FqC6ub+lh6T9r1oVhie70s1nxmqUCeUB7iS7J7KBwzmBxihtMXTGbZYqbbVXRmLBwOU0bPR5ItvkteZMuTdcLL0UKG5FjjfFg58tuC2MrgttVC++ZGj2luu/W8P8fIl8ar9ax0UqGaqHuriJDg2kNqm1lFpoNIS8NDXk4tp3DnECdhopTNVqaG8O/S5o9p+OP5kkaxLIlWG1kvzEquhmGYxi9JcnZVQAXjzbHVRBhYV1B6zeZZS9tJUUDzjIZiULmwVFMsgBqobDIrHrgGWIrDPoTwrPydeimn3HIpnCgqX4lTNoZg8CHDNZ/AzKNwnDByae/VmUK6C+R/NwroMlT7cQ93ksC5D2fi7qWrksY0MtcLuzbvHMpTjIPWSXMFIUAcWAwJWvRnKcYr5p/PBCGU9/6SpMEFxubewSkxQ6SpHarxB7A1QHJ4Iip6pAcp1hfC/AgMUk80Nr8wAtdI5l0/6FIr8BZitIj1Uav0dClW1HsrWpUHXRQ/lvup8a+qtmkDxGPQpmn5qN4FaLUxJpv4J1GphSrKd/IXaM/mWKYq1UA67LbI6LdRqAV2qqCZQzi/Hv0q2CHXSQq2W+qTkt3kob4Ur+1uTq/tWoO46qE1u3zbfvi1G9E0m5HX6QEtQLkcNU5X6Ii9wOmv4K0ONvskr1lqdICF8A9TyNPszMjY41ko00tBB6uSt8/7JH2nJ3eFVMo1smpWhshWYennkJ0PtV0g1sznybGDkOd/A+RRyPu+Dm3B5VM9dAIoZMs9nj1CpPn9QTdtDhylQaTxUOjgOzs6V+tMVjQGH6bcIlqQxwen8U2H98a5eGem8Zlqn2T78bLujjfQORpN70U/mPyHKo6YuTB9KL5hPgyy5Dc2TbSur61d96/KF31L5DzWvSdQf1xFIAAAAAElFTkSuQmCC"} 
                alt="profile" 
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg"
              />
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-yellow-400 border-2 border-white"></div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
  {unverifiedIndestiraluserDetails?.userInfo?.name || "User Profile"}
</h1>
              
            </div>
            <div className="flex-grow"></div>
            
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profile Info
          </button>
          <button
            className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'profession' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profession')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Professionals
          </button>

          
          <button
            className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'referenceCode' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('referenceCode')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Reference Code
          </button>
   
          <button
            className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('documents')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Documents {fileCounts.id + fileCounts.image > 0 && <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{fileCounts.id + fileCounts.image}</span>}
          </button>
          <button
            className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'oneminutevideo' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('oneminutevideo')}
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            One-Minute Video {fileCounts.oneMinuteVideo > 0 && <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{fileCounts.oneMinuteVideo}</span>}
          </button>
          
          <button
            className={`px-6 py-4 flex items-center ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('govermentId')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            govermentId
          </button>
          
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profession' && (
            <div>
              <UserDetailsTable records={records} />
            </div>
          )}

          {activeTab === "profile" && (
            <div>
               <UserinfoForList userId={userId} />
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              {unverifiedUserFilesLoadingStatus ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : unverifiedUserFilesErrorMessage ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {unverifiedUserFilesErrorMessage}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* ID Documents Card */}
                  <div
                    onClick={handleAadharcardDialog}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">ID Documents</h3>
                      <p className="text-sm text-gray-500">
                        {fileCounts.id > 0 ? 
                          `${fileCounts.id} document${fileCounts.id !== 1 ? 's' : ''} available` : 
                          "No ID documents uploaded"}
                      </p>
                    </div>
                  </div>

                  {/* Images Card */}
                  <div
                    onClick={handleImageDialog}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Project Images</h3>
                      <p className="text-sm text-gray-500">
                        {fileCounts.image > 0 ? 
                          `${fileCounts.image} image${fileCounts.image !== 1 ? 's' : ''} available` : 
                          "No project images uploaded"}
                      </p>
                    </div>
                  </div>

                  {/* Videos Card */}
                  <div
                    onClick={handlevideoDialog}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Project Videos</h3>
                      <p className="text-sm text-gray-500">
                        {fileCounts.video > 0 ? 
                          `${fileCounts.video} video${fileCounts.video !== 1 ? 's' : ''} available` : 
                          "No project videos uploaded"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

{/* ///////////////////// */}



{activeTab === 'govermentId' && (
            <div>
              {unverifiedUserFilesLoadingStatus ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : unverifiedUserFilesErrorMessage ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {unverifiedUserFilesErrorMessage}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                 

                  {/* Images Card */}
                  <div
                    onClick={handleGovermentidDialog}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Project Images</h3>
                      <p className="text-sm text-gray-500">
                        {fileCounts.image > 0 ? 
                          `${fileCounts.image} image${fileCounts.image !== 1 ? 's' : ''} available` : 
                          "No project images uploaded"}
                      </p>
                    </div>
                  </div>

                
                  
                </div>
              )}
            </div>
          )}

          {/* One-minute video tab content */}
          {activeTab === 'oneminutevideo' && (
            <div>
              {unverifiedUserFilesLoadingStatus ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : unverifiedUserFilesErrorMessage ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {unverifiedUserFilesErrorMessage}
                </div>
              ) : fileCounts.oneMinuteVideo > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    onClick={handleOneminutevideoDialog}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">One-Minute Video</h3>
                      <p className="text-sm text-gray-500">
                        {`${fileCounts.oneMinuteVideo} video${fileCounts.oneMinuteVideo !== 1 ? 's' : ''} available`}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                  </svg>
                  <p className="text-lg font-medium">No one-minute videos available</p>
                  <p className="text-sm">The user has not uploaded any one-minute videos yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>




      {activeTab === 'referenceCode' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Reference Code</h2>
                  <p className="text-gray-500 text-sm">User's unique reference code for referrals</p>
                </div>
              </div>
              
              {getDetailsLoadingStatus === "loading" ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : getDetailsErrorMessage ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  <p className="font-medium">Error loading reference code</p>
                  <p>{getDetailsErrorMessage}</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Reference Code</h3>
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-blue-600 mr-3">{unverifiedIndestiraluserDetails?.userInfo?.refCode || "No reference code available"}</span>
                        {unverifiedIndestiraluserDetails?.userInfo?.refCode && (
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(unverifiedIndestiraluserDetails.userInfo.refCode);
                              toast.success("Reference code copied to clipboard");
                            }}
                            className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}



      {/* File Preview Dialogs */}
      {fileType === "video" && (
        <DialogBox
          openDialogBox={openDialogBox}
          setopenDialogBox={setopenDialogBox}
          urls={urls}
        />
      )}

      {fileType === "image" && (
        <ImageDialog
          openDialogBox={openDialogBox}
          setopenDialogBox={setopenDialogBox}
          urls={urls}
        />
      )}

    {fileType === "govermentId" && (
        <ImageDialog
          openDialogBox={openDialogBox}
          setopenDialogBox={setopenDialogBox}
          urls={urls}
        />
      )}

      {/* Review Dialog */}
      <div className={`fixed inset-0 z-50 overflow-y-auto ${openReview ? 'flex' : 'hidden'} items-center justify-center`}>
        <div className="fixed inset-0 bg-black opacity-50" onClick={handleOpenReviewBox}></div>
        <div className="bg-white rounded-lg w-full max-w-md mx-auto z-50 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h3 className="text-lg font-medium">Approval Rating</h3>
            <p className="text-sm opacity-80">Rate this profile from 1-10</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col mb-6">
              <label className="mb-2 font-medium text-gray-700">Rating (1-10)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={review}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleOpenReviewBox}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handelApproveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnverfiedUserDetailsData;





///////////////////checking code--------------------------











//////////reject dialog box containg code -----------------------

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getUnverifiedIndustrialUserDetailsAction } from "../../redux/slices/notVerifiedIndustrialUserSlice";
// import { ToastContainer, toast } from "react-toastify";
// import { Button } from "@material-tailwind/react";
// import DialogBox from "../../component/VideoBox";
// import ImageDialog from "../../component/ImageDialog";
// import UserDetailsTable from "../industiralUser/UserDetailTable";
// import { approveUnverifiedInductrialUserProfile } from "../../api/industrialUser";
// import Userinfo from "../industiralUser/Userinfo";

// const UnverfiedUserDetailsData = ({ userId }) => {
//   const dispatch = useDispatch();
 
//   const {
//     unverifiedIndestiraluserDetails,
//     getDetailsLoadingStatus,
//     getDetailsErrorMessage,
//   } = useSelector((state) => state.industrialUser);

//   const [openDialogBox, setopenDialogBox] = useState(false);
//   const [urls, seturls] = useState(null);
//   const [fileType, setFileType] = useState(null);
//   const [openReview, setopenReview] = useState(false);
//   const [review, setReview] = useState("");
//   const [activeTab, setActiveTab] = useState("profile");
//   const [unverifiedUserFiles, setUnverifiedUserFiles] = useState([]);
//   const [unverifiedUserFilesLoadingStatus, setUnverifiedUserFilesLoadingStatus] = useState(false);
//   const [unverifiedUserFilesErrorMessage, setUnverifiedUserFilesErrorMessage] = useState(null);

//   const [openRejectDialog, setOpenRejectDialog] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");

//   const handleOpenReviewBox = () => setopenReview(!openReview);

//   // Add the missing handleRejectReasonChange function
//   const handleRejectReasonChange = (e) => {
//     setRejectReason(e.target.value);
//   };

//   // Function to fetch files directly using the API
//   const fetchUserFiles = async (userId) => {
//     setUnverifiedUserFilesLoadingStatus(true);
//     try {
//       // Get token from localStorage
//       const token = localStorage.getItem('jwt');
      
//       if (!token) {
//         throw new Error('Authentication token not found');
//       }
      
//       const response = await fetch(
//         `https://www.filmhooks.annulartech.net/industryUser/getIndustryFilesByUserId?userId=${userId}`, 
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch user files');
//       }
      
//       const result = await response.json();
      
//       if (result.status === 1) {
//         setUnverifiedUserFiles(result.data || []);
//         console.log("Files fetched successfully:", result.data);
//       } else {
//         throw new Error(result.message || 'Failed to fetch user files');
//       }
//     } catch (err) {
//       setUnverifiedUserFilesErrorMessage(err.message);
//       toast.error("Error fetching user files");
//       console.error("Error fetching files:", err);
//     } finally {
//       setUnverifiedUserFilesLoadingStatus(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       dispatch(getUnverifiedIndustrialUserDetailsAction(userId));
//       fetchUserFiles(userId);
//     }
//   }, [userId, dispatch]);

//   const handleOpenRejectDialog = () => setOpenRejectDialog(!openRejectDialog);

//   const submitRejectProfile = async () => {
//     try {
//       // Check if reason is provided
//       if (!rejectReason.trim()) {
//         toast.error("Please provide a reason for rejection");
//         return;
//       }
      
//       // Get token from local storage
//       const token = localStorage.getItem('jwt');
      
//       if (!token) {
//         toast.error("Authentication token not found");
//         return;
//       }

//       const response = await fetch('https://www.filmhooks.annulartech.net/admin/changeStatusUnverifiedIndustrialUsers', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           userId: parseInt(userId),
//           status: true, // true for reject
//           rejectReason: rejectReason
//         })
//       });

//       const data = await response.json();
      
//       if (data.message === "Success" || response.ok) {
//         toast.success("Profile rejected successfully");
//         setOpenRejectDialog(false);
//         setRejectReason("");
//       } else {
//         toast.error(data.message || "Failed to reject profile");
//       }
//     } catch (error) {
//       console.error("Error rejecting profile:", error);
//       toast.error("An error occurred while rejecting the profile");
//     }
//   };

//   const handleReviewChange = (e) => {
//     const value = e.target.value;
//     if (value >= 1 && value <= 10) {
//       setReview(value);
//     } else if (value < 1) {
//       setReview(1);
//     } else if (value > 10) {
//       setReview(10);
//     }
//   };

//   const records = unverifiedIndestiraluserDetails.Data
//     ? unverifiedIndestiraluserDetails.Data.flatMap((industry, industryIndex) =>
//       (industry.platformDetails || []).flatMap((platform, platformIndex) =>
//         (platform.professionDetails || []).map(
//           (profession, professionIndex) => ({
//             id: `${industryIndex}-${platformIndex}-${professionIndex}`,
//             industryName: industry.industriesName,
//             platformName: platform.platformName,
//             professionName: profession.professionName,
//             filmCount: platform.filmCount,
//             netWorth: platform.netWorth,
//             dailySalary: platform.dailySalary,
//             userId: industry.iupdId,
//             subproffession: profession.subProfessionName
//           })
//         )
//       )
//     )
//     : [];

//   const handleAadharcardDialog = () => {
//     setFileType("image");
//     setopenDialogBox(!openDialogBox);

//     const idCardFiles = unverifiedUserFiles.filter(
//       (file) => file.category === "AadhaarCard" || file.category === "PanCard" || file.category === "govermentId"
//     );

//     const filePaths = idCardFiles.map(file => file.filePath);
//     seturls(filePaths);
//   };

//   const handleImageDialog = () => {
//     setFileType("image");
//     setopenDialogBox(!openDialogBox);

//     const imageFiles = unverifiedUserFiles.filter(
//       (file) => file.category === "Image"
//     );

//     const imageFilePaths = imageFiles.map(file => file.filePath);
//     seturls(imageFilePaths);
//   };

//   const handleGovermentidDialog = () => {
//     console.log(unverifiedUserFiles)
//     setFileType("govermentId");
//     setopenDialogBox(!openDialogBox);

//     const imageCardFile = unverifiedUserFiles.filter(
//       (file) => file.category === "govermentId"
//     );
//     console.log(imageCardFile)

//     const imageCardFilePath = imageCardFile.map(file => file.filePath);

//     seturls(imageCardFilePath);
//     console.log(urls)
//   };

//   const handlevideoDialog = () => {
//     setFileType("video");
//     setopenDialogBox(!openDialogBox);

//     const videoFiles = unverifiedUserFiles.filter(
//       (file) => file.category === "Video"
//     );

//     const videoFilePaths = videoFiles.map(file => file.filePath);
//     seturls(videoFilePaths);
//   };

//   const handleOneminutevideoDialog = () => {
//     setFileType("video");
//     setopenDialogBox(!openDialogBox);

//     const oneminutevideoFiles = unverifiedUserFiles.filter(
//       (file) => file.category === "oneMinuteVideo"
//     );

//     const oneminutevideoFilePaths = oneminutevideoFiles.map(file => file.filePath);
//     seturls(oneminutevideoFilePaths);
//   };

//   // This function is redundant now that we have submitRejectProfile
//   // Keeping it for backward compatibility but modifying to use the dialog
//   const handelRejectProfile = () => {
//     handleOpenRejectDialog(); // Open the reject dialog instead of immediately rejecting
//   };

//   const handelApproveProfile = async () => {
//     try {
//       const details = {
//         userId: userId,
//         status: false,
//         adminReview: review,
//       };
//       const data = await approveUnverifiedInductrialUserProfile(details);
//       if (data.message === "Success") {
//         toast.success("Profile approved successfully");
//       }
//       handleOpenReviewBox();
//     } catch (error) {
//       toast.error("Failed to approve profile");
//       console.error("Error approving profile:", error);
//     }
//   };

//   // Function to render file counts by category
//   const getFileCounts = () => {
//     const counts = {
//       id: unverifiedUserFiles.filter(file => 
//         ["AadhaarCard", "PanCard", "govermentId"].includes(file.category)).length,
//       image: unverifiedUserFiles.filter(file => file.category === "Image").length,
//       video: unverifiedUserFiles.filter(file => file.category === "Video").length,
//       oneMinuteVideo: unverifiedUserFiles.filter(file => file.category === "oneMinuteVideo").length
//     };
//     return counts;
//   };

//   const fileCounts = getFileCounts();

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Header Card */}
//       <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
//         <div className="px-6 pb-6 relative">
//           <div className="flex flex-col md:flex-row items-center md:items-end">
//             <div className="-mt-16 relative">
//               {/* Profile Image */}
//               <img 
//                 src={unverifiedUserFiles.find(file => file.category === "Image")?.filePath || 
//                      "https://media.istockphoto.com/id/1225585631/photo/5g-communications-tower-with-man-using-mobile-phone.jpg?s=612x612&w=0&k=20&c=3guCR-COMpYY2OMSYMch__63i2ywVH2YNa-Bs-pAhNQ="} 
//                 alt="profile" 
//                 className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg"
//               />
//               <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-yellow-400 border-2 border-white"></div>
//             </div>
//             <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {unverifiedIndestiraluserDetails?.userInfo?.name || "User Profile"}
//               </h1>
//               <p className="text-gray-500">Unverified Industrial User</p>
//             </div>
//             <div className="flex-grow"></div>
//             <div className="mt-6 md:mt-0 flex space-x-3">
//               <button onClick={handleOpenReviewBox} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center shadow-md">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//                 Approve
//               </button>
//               <button onClick={handleOpenRejectDialog} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center shadow-md">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                 </svg>
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {openRejectDialog && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Reason for Rejection</h3>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Please provide a reason for rejection
//               </label>
//               <textarea
//                 value={rejectReason}
//                 onChange={handleRejectReasonChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 rows="4"
//                 placeholder="Enter rejection reason..."
//               />
//             </div>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={handleOpenRejectDialog}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitRejectProfile}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                 disabled={!rejectReason.trim()}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tab Navigation */}
//       <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
//         <div className="flex border-b overflow-x-auto">
//           <button
//             className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//             </svg>
//             Profile Info
//           </button>
//           <button
//             className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('documents')}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//             </svg>
//             Documents {fileCounts.id + fileCounts.image > 0 && <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{fileCounts.id + fileCounts.image}</span>}
//           </button>
//           <button
//             className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'oneminutevideo' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('oneminutevideo')}
//           >
//             <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//             </svg>
//             One-Minute Video {fileCounts.oneMinuteVideo > 0 && <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">{fileCounts.oneMinuteVideo}</span>}
//           </button>
//           <button
//             className={`px-6 py-4 flex items-center whitespace-nowrap ${activeTab === 'profession' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('profession')}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//             </svg>
//             Professionals
//           </button>
   


//           <button
//             className={`px-6 py-4 flex items-center ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('govermentId')}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//             </svg>
//             govermentId
//           </button>
          
//         </div>

//         {/* Tab Content */}
//         <div className="p-6">
//           {activeTab === 'profession' && (
//             <div>
//               <UserDetailsTable records={records} />
//             </div>
//           )}

//           {activeTab === "profile" && (
//             <div>
//               <Userinfo userInfo={unverifiedIndestiraluserDetails?.userInfo} />
//             </div>
//           )}

//           {activeTab === 'documents' && (
//             <div>
//               {unverifiedUserFilesLoadingStatus ? (
//                 <div className="flex justify-center py-10">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//               ) : unverifiedUserFilesErrorMessage ? (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                   {unverifiedUserFilesErrorMessage}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {/* ID Documents Card */}
//                   <div
//                     onClick={handleAadharcardDialog}
//                     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
//                       <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-800">ID Documents</h3>
//                       <p className="text-sm text-gray-500">
//                         {fileCounts.id > 0 ? 
//                           `${fileCounts.id} document${fileCounts.id !== 1 ? 's' : ''} available` : 
//                           "No ID documents uploaded"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Images Card */}
//                   <div
//                     onClick={handleImageDialog}
//                     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mr-4">
//                       <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-800">Project Images</h3>
//                       <p className="text-sm text-gray-500">
//                         {fileCounts.image > 0 ? 
//                           `${fileCounts.image} image${fileCounts.image !== 1 ? 's' : ''} available` : 
//                           "No project images uploaded"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Videos Card */}
//                   <div
//                     onClick={handlevideoDialog}
//                     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg mr-4">
//                       <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-800">Project Videos</h3>
//                       <p className="text-sm text-gray-500">
//                         {fileCounts.video > 0 ? 
//                           `${fileCounts.video} video${fileCounts.video !== 1 ? 's' : ''} available` : 
//                           "No project videos uploaded"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

// {/* ///////////////////// */}



// {activeTab === 'govermentId' && (
//             <div>
//               {unverifiedUserFilesLoadingStatus ? (
//                 <div className="flex justify-center py-10">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//               ) : unverifiedUserFilesErrorMessage ? (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                   {unverifiedUserFilesErrorMessage}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                 

//                   {/* Images Card */}
//                   <div
//                     onClick={handleGovermentidDialog}
//                     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mr-4">
//                       <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-800">Project Images</h3>
//                       <p className="text-sm text-gray-500">
//                         {fileCounts.image > 0 ? 
//                           `${fileCounts.image} image${fileCounts.image !== 1 ? 's' : ''} available` : 
//                           "No project images uploaded"}
//                       </p>
//                     </div>
//                   </div>

                
                  
//                 </div>
//               )}
//             </div>
//           )}



// {/* /////////////////////////// */}





// {/* {activeTab === 'govermentId' && (
  
//   <div
//     onClick={handleGovermentidDialog}
//     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//   >
//     <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mr-4">
//       <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//       </svg>
//     </div>
//     <div>
//       <h3 className="font-medium text-gray-800">Projects Images</h3>
//       <p className="text-sm text-gray-500">Govermentid </p>
//     </div>
//   </div>

// )} */}


//           {/* One-minute video tab content */}
//           {activeTab === 'oneminutevideo' && (
//             <div>
//               {unverifiedUserFilesLoadingStatus ? (
//                 <div className="flex justify-center py-10">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//               ) : unverifiedUserFilesErrorMessage ? (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                   {unverifiedUserFilesErrorMessage}
//                 </div>
//               ) : fileCounts.oneMinuteVideo > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div
//                     onClick={handleOneminutevideoDialog}
//                     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 flex items-center cursor-pointer"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg mr-4">
//                       <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//                       </svg>
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-800">One-Minute Video</h3>
//                       <p className="text-sm text-gray-500">
//                         {`${fileCounts.oneMinuteVideo} video${fileCounts.oneMinuteVideo !== 1 ? 's' : ''} available`}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-10 text-gray-500">
//                   <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
//                   </svg>
//                   <p className="text-lg font-medium">No one-minute videos available</p>
//                   <p className="text-sm">The user has not uploaded any one-minute videos yet.</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* File Preview Dialogs */}
//       {fileType === "video" && (
//         <DialogBox
//           openDialogBox={openDialogBox}
//           setopenDialogBox={setopenDialogBox}
//           urls={urls}
//         />
//       )}

//       {fileType === "image" && (
//         <ImageDialog
//           openDialogBox={openDialogBox}
//           setopenDialogBox={setopenDialogBox}
//           urls={urls}
//         />
//       )}

// {fileType === "govermentId" && (
//         <ImageDialog
//           openDialogBox={openDialogBox}
//           setopenDialogBox={setopenDialogBox}
//           urls={urls}
//         />
//       )}

//       {/* Review Dialog */}
//       <div className={`fixed inset-0 z-50 overflow-y-auto ${openReview ? 'flex' : 'hidden'} items-center justify-center`}>
//         <div className="fixed inset-0 bg-black opacity-50" onClick={handleOpenReviewBox}></div>
//         <div className="bg-white rounded-lg w-full max-w-md mx-auto z-50 overflow-hidden">
//           <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//             <h3 className="text-lg font-medium">Approval Rating</h3>
//             <p className="text-sm opacity-80">Rate this profile from 1-10</p>
//           </div>
//           <div className="p-6">
//             <div className="flex flex-col mb-6">
//               <label className="mb-2 font-medium text-gray-700">Rating (1-10)</label>
//               <div className="relative">
//                 <input
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={review}
//                   onChange={handleReviewChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <div className="absolute right-0 inset-y-0 flex items-center pr-3">
//                   <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <button
//                 onClick={handleOpenReviewBox}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handelApproveProfile}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//               >
//                 Submit Rating
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnverfiedUserDetailsData;