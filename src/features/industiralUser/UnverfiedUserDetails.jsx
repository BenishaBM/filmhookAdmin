// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getUnverifiedIndustrialUserDetailsAction,
//   getUnverifiedProfileFilesAction,
// } from "../../redux/slices/notVerifiedIndustrialUserSlice";
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   Avatar,
//   Card,
//   List,
//   ListItem,
//   Dialog,
//   DialogBody,
//   DialogFooter,
//   Button,
// } from "@material-tailwind/react";
// import DialogBox from "../../component/VideoBox";
// import ImageDialog from "../../component/ImageDialog";
// import UserDetailsTable from "./UserDetailTable";
// import { approveUnverifiedInductrialUserProfile } from "../../api/industrialUser";

// const UnverfiedUserDetails = () => {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
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
//   const [aadharurl,setAadharurl] = useState(null)
//   const [fileType, setFileType] = useState(null);
//   const [openReview, setopenReview] = useState(false);
//   const [review, setReview] = useState("");

//   const handleOpenReviewBox = () => setopenReview(!openReview);

//   useEffect(() => {
//     dispatch(getUnverifiedIndustrialUserDetailsAction(userId));
//     dispatch(getUnverifiedProfileFilesAction(userId));
//   }, []);

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
//         (industry.platformDetails || []).flatMap((platform, platformIndex) =>
//           (platform.professionDetails || []).map(
//             (profession, professionIndex) => ({
//               id: `${industryIndex}-${platformIndex}-${professionIndex}`,
//               industryName: industry.industriesName,
//               platformName: platform.platformName,
//               professionName: profession.professionName,
//               filmCount: platform.filmCount,
//               netWorth: platform.netWorth,
//               dailySalary: platform.dailySalary,
//               userId: industry.iupdId, // Adjust as necessary
//             })
//           )
//         )
//       )
//     : [];

//   const handleAadharcardDialog = () => {
//     setFileType("image");
//     setopenDialogBox(!openDialogBox);
//     const aadharCardFile = unverifiedUserFiles.find(
//       (file) => file.category === "AadhaarCard" || "PanCard"
//     );

//     const aadharCardFilePath = aadharCardFile ? aadharCardFile.filePath : null;
//     seturls(aadharCardFilePath);
//   };

//   const handleImageDialog = () => {
//     setFileType("image");
//     setopenDialogBox(!openDialogBox);

//     const imageCardFile = unverifiedUserFiles.find(
//       (file) => file.category === "Image"
//     );

//     const imageCardFilePath = imageCardFile ? imageCardFile.filePath : null;
//     seturls(imageCardFilePath);
//   };
//   const handlevideoDialog = () => {
//     setFileType("video");
//     setopenDialogBox(!openDialogBox);
//     const videoCardFile = unverifiedUserFiles.find(
//       (file) => file.category === "Video"
//     );

//     const videoCardFilePath = videoCardFile ? videoCardFile.filePath : null;
//     console.log("videoCardFilePath", videoCardFilePath);
//     seturls(videoCardFilePath);
//   };

//   const handelRejectProfile = async() => {
//     const details = {
//       userId: userId,
//       status: true,
//       adminReview: 0,
//     };
//     const data = await approveUnverifiedInductrialUserProfile(details);
//     if(data.message === "Success"){
//       toast.error("Sorry Your Profile Rejected")
//     }
//     console.log("data",data.message)
//   };

//   const handelApproveProfile = async() => {
//     const details = {
//       userId: userId,
//       status: false,
//       adminReview: review,
//     };
//     const data = await approveUnverifiedInductrialUserProfile(details);
//     if(data.message === "Success"){
//       toast.success("Your Profile Approved")
//     }
//     handleOpenReviewBox();
//     console.log("data",data.message)
//   };


//   return (
//     <div className="h-full w-full flex items-center justify-start flex-col py-4">
//       < ToastContainer/>
//       <Avatar
//         size="xxl"
//         alt="avatar"
//         src={unverifiedIndestiraluserDetails.profilePicturePath}
//         className="border border-[#1e1ff5] shadow-xl shadow-blue-900/20 ring-4 ring-blue-[#1e1ff5]"
//       />
//       <p className=" text-[#1e1ff5] flex items-center justify-center my-4 text-2xl">
//         {unverifiedIndestiraluserDetails?.userInfo?.name}
//       </p>
//       <Card className="h-[2.5rem] w-[45%] flex items-center justify-center">
//         <List className="flex flex-row w-full ">
//           <ListItem className = "h-[2.3rem]" onClick={handleAadharcardDialog}>
//             Aadhar Card / Pancard
//           </ListItem>
//           <ListItem className = "h-[2.3rem]" onClick={handleImageDialog}>Projects Image </ListItem>
//           <ListItem className = "h-[2.3rem]" onClick={handlevideoDialog}>Project Video </ListItem>
//         </List>
//       </Card>
//       <div className="flex my-3">
//         <Button
//           onClick={handleOpenReviewBox}
//           className="mr-3 bg-green-500 hover:bg-green-700"
//         >
//           Approve
//         </Button>
//         <Button
//           className="bg-red-500 hover:bg-red-700"
//           onClick={handelRejectProfile}
//         >
//           Reject
//         </Button>
//       </div>
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

//       <Dialog
//         open={openReview}
//         handler={handleOpenReviewBox}
//         className=" w-[50%]"
//       >
//         <DialogBody className=" w-full flex items-center justify-center">
//           <div className=" w-[40%] flex items-center ">
//             {/* <lable className="mr-4">Review</lable> */}
//             <label className="mr-4">Review</label>
//             <input
//               type="number"
//               min="0"
//               max="10"
//               value={review}
//               className="border w-[4rem] px-2 py-1"
//               onChange={handleReviewChange}
//             />
//           </div>

//           <Button
//             variant="text"
//             color="red"
//             onClick={handleOpenReviewBox}
//             className="mr-1"
//           >
//             <span>Cancel</span>
//           </Button>
//           <Button
//             variant="gradient"
//             color="green"
//             onClick={handelApproveProfile}
//           >
//             <span>Confirm</span>
//           </Button>
//         </DialogBody>
//       </Dialog>

//       <UserDetailsTable records={records} />
//     </div>
//   );
// };

// export default UnverfiedUserDetails;







import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnverifiedIndustrialUserDetailsAction,
  getUnverifiedProfileFilesAction,
} from "../../redux/slices/notVerifiedIndustrialUserSlice";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import DialogBox from "../../component/VideoBox";
import ImageDialog from "../../component/ImageDialog";
import UserDetailsTable from "./UserDetailTable";
import { approveUnverifiedInductrialUserProfile } from "../../api/industrialUser";
import Userinfo from "./Userinfo";

const UnverfiedUserDetails = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const {
    unverifiedIndestiraluserDetails,
    getDetailsLoadingStatus,
    getDetailsErrorMessage,
    unverifiedUserFiles,
    unverifiedUserFilesLoadingStatus,
    unverifiedUserFilesErrorMessage,
  } = useSelector((state) => state.industrialUser);

  const [openDialogBox, setopenDialogBox] = useState(false);
  const [urls, seturls] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [openReview, setopenReview] = useState(false);
  const [review, setReview] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const handleOpenReviewBox = () => setopenReview(!openReview);

  useEffect(() => {
    dispatch(getUnverifiedIndustrialUserDetailsAction(userId));
    dispatch(getUnverifiedProfileFilesAction(userId));
  }, []);

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
            subproffession: profession.subProfessionName  // changing 28
          })
        )
      )
    )
    : [];

  const handleAadharcardDialog = () => {
    console.log(unverifiedUserFiles)
    setFileType("image");
    setopenDialogBox(!openDialogBox);
    // const aadharCardFile = unverifiedUserFiles.find(
    //   (file) => file.category === "AadhaarCard" || "PanCard"

    // );

    const aadharCardFile = unverifiedUserFiles.filter(
      (file) => file.category === "AadhaarCard" || file.category === "PanCard"
    );
    console.log(aadharCardFile)

    const filePaths = aadharCardFile.map(file => file.filePath);

    seturls(filePaths);
    console.log(urls)
  };

  const handleImageDialog = () => {
    console.log(unverifiedUserFiles)
    setFileType("image");
    setopenDialogBox(!openDialogBox);


    const imageCardFile = unverifiedUserFiles.filter(
      (file) => file.category === "Image"
    );
    console.log(imageCardFile)

    const imageCardFilePath = imageCardFile.map(file => file.filePath);

    seturls(imageCardFilePath);
    console.log(urls)
  };

  // const handlevideoDialog = () => {
  //   setFileType("video");
  //   setopenDialogBox(!openDialogBox);
  //   // const videoCardFile = unverifiedUserFiles.find(
  //   //   (file) => file.category === "Video"
  //   // );


  //   const videoCardFile = unverifiedUserFiles.filter(
  //     (file) => file.category === "Video"
  //   );

  //   console.log(videoCardFile)

  //   const videoCardFilePath = videoCardFile.map(file => file.filePath);

  //   seturls(videoCardFilePath);
  //   console.log(urls)
  // };




  const handlevideoDialog = () => {
    setFileType("video");
    setopenDialogBox(!openDialogBox);

    const videoCardFile = unverifiedUserFiles.filter(
      (file) => file.category === "Video"
    );

    const videoCardFilePath = videoCardFile.map(file => file.filePath);

    seturls(videoCardFilePath);
    console.log("Setting urls to:", videoCardFilePath); // correct logging
  };


  // oneminute video dialogue
  const handleOneminutevideoDialog = () => {
    setFileType("oneminutevideo");
    setopenDialogBox(!openDialogBox);

    const oneminutevideoCardFile = unverifiedUserFiles.filter(
      (file) => file.category === "oneMinuteVideo"
    );

    const oneminutevideoCardFilePath = oneminutevideoCardFile.map(file => file.filePath);

    seturls(oneminutevideoCardFilePath);
    console.log("Setting urls to:", oneminutevideoCardFilePath); // correct logging
  };


  const handelRejectProfile = async () => {
    const details = {
      userId: userId,
      status: true,
      adminReview: 0,
    };
    const data = await approveUnverifiedInductrialUserProfile(details);
    if (data.message === "Success") {
      toast.error("Profile rejected successfully")
    }
  };

  const handelApproveProfile = async () => {
    const details = {
      userId: userId,
      status: false,
      adminReview: review,
    };
    const data = await approveUnverifiedInductrialUserProfile(details);
    if (data.message === "Success") {
      toast.success("Profile approved successfully")
    }
    handleOpenReviewBox();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="-mt-16 relative">
              {/* <img
                src={unverifiedIndestiraluserDetails.profilePicturePath || "/api/placeholder/120/120"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg"
              /> */}

              {/* static image changes is required */}
              <img src="https://media.istockphoto.com/id/1225585631/photo/5g-communications-tower-with-man-using-mobile-phone.jpg?s=612x612&w=0&k=20&c=3guCR-COMpYY2OMSYMch__63i2ywVH2YNa-Bs-pAhNQ=" alt="onlineimg"
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg" />
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-yellow-400 border-2 border-white"></div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">
                {unverifiedIndestiraluserDetails?.userInfo?.name || "User Profile"}
              </h1>
              <p className="text-gray-500">Unverified Industrial User</p>
            </div>
            <div className="flex-grow"></div>
            <div className="mt-6 md:mt-0 flex space-x-3">
              <button onClick={handleOpenReviewBox} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 flex items-center shadow-md">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Approve
              </button>
              <button onClick={handelRejectProfile} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center shadow-md">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-4 flex items-center ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profile Info
          </button>
          <button
            className={`px-6 py-4 flex items-center ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('documents')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Documents
          </button>


          {/* i am adding oneminute video to this tab */}


          <button
            className={`px-6 py-4 flex items-center ${activeTab === 'oneminutevideo' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('oneminutevideo')}
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            One-Minute Video
          </button>
          {/* profession tab */}
          <button
            className={`px-6 py-4 flex items-center ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profession')}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Professionals
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
              <Userinfo> </Userinfo>
            </div>

          )

          }


          {activeTab === 'documents' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <h3 className="font-medium text-gray-800">Aadhar Card / PAN Card</h3>
                    <p className="text-sm text-gray-500">View identification documents</p>
                  </div>
                </div>

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
                    <h3 className="font-medium text-gray-800">Projects Images</h3>
                    <p className="text-sm text-gray-500">View project portfolio images</p>
                  </div>
                </div>

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
                    <p className="text-sm text-gray-500">View video demonstrations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* oneminute-video condition  */}
          {activeTab === 'oneminutevideo' && (
            <div>
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
                    <p className="text-sm text-gray-500">View Video Demonstration </p>
                  </div>
                </div>




              </div>
            </div>
          )}



        </div>
      </div>

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

      {fileType === "oneminutevideo" && (
        <DialogBox
          openDialogBox={openDialogBox}
          setopenDialogBox={setopenDialogBox}
          urls={urls}
        />
      )}
      {/* both video and oneminute video popup are in videobox components */}

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

export default UnverfiedUserDetails;