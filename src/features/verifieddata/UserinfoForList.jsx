
import React, { useEffect, useState } from 'react';

const UserinfoForList = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState('About');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('jwt');
        
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        // Check if we have a valid userId
        if (!userId) {
          throw new Error('User ID is required');
        }
        
        console.log("Fetching user data for userId:", userId);
        
        const response = await fetch(`https://www.filmhooks.annulartech.net/user/getUserByUserId?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status} - ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("API Response:", result);
        
        if (result.status === 1) {
          setUserData(result.data);
        } else {
          throw new Error(result.message || 'Failed to retrieve user data');
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchUserData();
    } else {
      setError('User ID is required');
      setLoading(false);
    }
  }, [userId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="font-medium">Error loading user information</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
        <p className="font-medium">No user data found</p>
      </div>
    );
  }

  // Format date if available
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (err) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Profile photo */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48">
            <img
              src={userData.profilePicUrl || "/api/placeholder/240/240"}
              alt="Profile"
              className="w-full h-full object-cover rounded-md bg-gray-100"
            />
          </div>
        </div>
        
        {/* Right side - Profile info */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">{userData.name || "User Name"}</h2>
              <p className="text-blue-600">{userData.userType || "User Type"}</p>
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
              <div className="col-span-2 text-gray-700">{userData.userId || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">FilmHook Code</div>
              <div className="col-span-2 text-gray-700">{userData.filmHookCode || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Full Name</div>
              <div className="col-span-2 text-gray-700">{userData.name || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Email</div>
              <div className="col-span-2 text-gray-700">{userData.email || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Phone</div>
              <div className="col-span-2 text-gray-700">
                {userData.countryCode ? `${userData.countryCode} ` : ""}
                {userData.phoneNumber || "N/A"}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Gender</div>
              <div className="col-span-2 text-gray-700">{userData.gender || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Date of Birth</div>
              <div className="col-span-2 text-gray-700">{formatDate(userData.dob)}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Living Place</div>
              <div className="col-span-2 text-gray-700">{userData.livingPlace || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Birth Place</div>
              <div className="col-span-2 text-gray-700">{userData.birthPlace || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">District</div>
              <div className="col-span-2 text-gray-700">{userData.district || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Admin Review</div>
              <div className="col-span-2 text-gray-700">{userData.adminReview || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Account Created</div>
              <div className="col-span-2 text-gray-700">{formatDate(userData.createdOn)}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Reference Code</div>
              <div className="col-span-2 text-gray-700">{userData.refCode || "N/A"}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Verification Status</div>
              <div className="col-span-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${userData.industryUserVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {userData.industryUserVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Booking Available Date</div>
              <div className="col-span-2 text-gray-700">{formatDate(userData.bookingAvailableDate)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserinfoForList;
