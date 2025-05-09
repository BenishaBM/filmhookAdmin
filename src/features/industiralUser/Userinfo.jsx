import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { getprofileinfo, profileinfovalue } from '../../redux/slices/notVerifiedIndustrialUserSlice';

const Userinfo = () => {
    const [selectedTab, setSelectedTab] = useState('About');
    // const profileInfoValue = useSelector(profileinfovalue);
    const dispatch = useDispatch();
    // useEffect(()=>{
    //   const details = {
    //     userId : 3
    //   }
    //   dispatch(getprofileinfo(details))
    //     console.log("this is comming")
    //     console.log(profileInfoValue)
    // })
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side - Profile photo only */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <img 
                  src="/api/placeholder/240/240" 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-md"
                />
                <button className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white py-2 text-center">
                  Change Photo
                </button>
              </div>
            </div>
            
            {/* Right side - Profile info */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Kshiti Ghelani</h2>
                  <p className="text-blue-600">Web Developer and Designer</p>
                </div>
                <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md">
                  Edit Profile
                </button>
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
                  <div className="font-medium">User Id</div>
                  <div className="col-span-2 text-blue-600">Kshiti123</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Name</div>
                  <div className="col-span-2 text-blue-600">Kshiti Ghelani</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Email</div>
                  <div className="col-span-2 text-blue-600">kshitighelani@gmail.com</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Phone</div>
                  <div className="col-span-2 text-blue-600">123 456 7890</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Profession</div>
                  <div className="col-span-2 text-blue-600">Web Developer and Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Userinfo;



