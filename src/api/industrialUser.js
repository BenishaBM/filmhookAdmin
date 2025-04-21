import publicAPI from "./publicApi";
import Apiconfig from "./Apiconfig";
import privateAPI from "./privateApi";

// get unverified industrial user list :

export const getUnVerifiedIndustrialUserListAPI = async (pageDetails) => {
  try {
    const response = await privateAPI.post(
      Apiconfig.unVerifiedIndustrialUser,
      pageDetails
    );
    const data = await response.data;
    return data.data;
  } catch (error) {
    // console.log("error unverified list ", error);
    throw Error(error.response.data.message);
  }
};

// get unverified Industrial UserDetails

export const getUnverfiedIndustrialUserDetailsAPI = async (userId) => {
  const id = {
    userId: userId,
  };
  try {
    const response = await privateAPI.post(Apiconfig.unverifiedUserDetails, id);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("error unverified details ", error);
    throw Error(error.response.data.message);
  }
};

// get unverified users files
export const getUnverifiedProfilesAPI = async (userId) => {
  try {
    const response = await privateAPI.get(
      `/industryUser/getIndustryFilesByUserId?userId=${userId}`
    );
    return response.data.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

// Approve or reject unverified details

export const approveUnverifiedInductrialUserProfile = async (details) => {
  try {
    const response = await privateAPI.post(
      Apiconfig.changeStatusUnverifiedIndustrialUsers,
      details
    );
    console.log("approve response", response.data);
    return response.data;
  } catch (error) {
    console.log("error: ", error.response);
    throw Error(error.response);
  }
};


