import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Userinfo = () => {
  const [selectedTab, setSelectedTab] = useState('About');
  const { userId } = useParams();
  
  const {
    unverifiedIndestiraluserDetails,
    getDetailsLoadingStatus,
    getDetailsErrorMessage,
  } = useSelector((state) => state.industrialUser);
  
  const userInfo = unverifiedIndestiraluserDetails?.userInfo || {};
  
  if (getDetailsLoadingStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (getDetailsErrorMessage) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="font-medium">Error loading user information</p>
        <p>{getDetailsErrorMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Profile photo */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            <img
              src={unverifiedIndestiraluserDetails.profilePicturePath || "/api/placeholder/240/240"}
              alt="Profile"
              className="w-full h-full object-cover rounded-md bg-gray-100"
            />
          </div>
        </div>
        
        {/* Right side - Profile info */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">{userInfo.name || "User Name"}</h2>
              <p className="text-blue-600">{userInfo.userType || "User Type"}</p>
            </div>
          </div>
          
          {/* Tabs - Only About tab */}
          <div className="border-b mb-6">
            <div className="flex">
              <button
                className={`py-2 px-4 ${selectedTab === 'About' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
                onClick={() => setSelectedTab('About')}
              >
                About
              </button>
            </div>
          </div>
          
          {/* Profile details */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">User ID</div>
              <div className="col-span-2 text-gray-700">{userInfo.userId || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">FilmHook Code</div>
              <div className="col-span-2 text-gray-700">{userInfo.filmHookCode || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Full Name</div>
              <div className="col-span-2 text-gray-700">{userInfo.name || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Email</div>
              <div className="col-span-2 text-gray-700">{userInfo.email || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Phone</div>
              <div className="col-span-2 text-gray-700">
                {userInfo.countryCode || ""} {userInfo.phoneNumber || "N/A"}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Gender</div>
              <div className="col-span-2 text-gray-700">{userInfo.gender || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Date of Birth</div>
              <div className="col-span-2 text-gray-700">{userInfo.dob || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Living Place</div>
              <div className="col-span-2 text-gray-700">{userInfo.livingPlace || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Birth Place</div>
              <div className="col-span-2 text-gray-700">{userInfo.birthPlace || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">District</div>
              <div className="col-span-2 text-gray-700">{userInfo.district || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Admin Review</div>
              <div className="col-span-2 text-gray-700">{userInfo.adminReview || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Account Created</div>
              <div className="col-span-2 text-gray-700">
                {userInfo.createdOn ? new Date(userInfo.createdOn).toLocaleDateString() : "N/A"}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Verification Status</div>
              <div className="col-span-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${userInfo.industryUserVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {userInfo.industryUserVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userinfo;