
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUnverifiedIndustrialUserDetailsAction } from "../../redux/slices/notVerifiedIndustrialUserSlice";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import DialogBox from "../../component/VideoBox";
import ImageDialog from "../../component/ImageDialog";
import UserDetailsTable from "../industiralUser/UserDetailTable";
import { approveUnverifiedInductrialUserProfile } from "../../api/industrialUser";
import UserinfoForList from "../verifieddata/UserinfoForList"

const UnverfiedUserTable = ({ userId }) => {
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
                     "data:image/png;base64,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"} 
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

          

          

{/* ///////////////////// */}





         
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

export default UnverfiedUserTable;
