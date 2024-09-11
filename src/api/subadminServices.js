import publicAPI from "./publicApi";
import Apiconfig from "./Apiconfig";
import privateAPI from "./privateApi";
import axios from "axios";

// get subadmin list
export const getSubadminListApi = async (pageDetils) => {
  try {
    const response = await publicAPI.post(Apiconfig.subadminList, pageDetils);
    const data = await response.data;
    return data.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

// create subadmin

export const createSubadminApi = async (details) => {
  try {
    const response = await publicAPI.post(Apiconfig.createSubadmin, details);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

// delete subadmin

export const deleteSubadminApi = async (userId) => {
  const id = {
    userId: userId,
  };

  try {
    const response = await publicAPI.post(Apiconfig.deleteSubadmin, id);
    return userId;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};

// edit subadmin 

export const editSubadminApi = async (details) =>{

  try{
    const response = await publicAPI.post(Apiconfig.editSubadmin,details)
    return details
  }catch(error){
    if(error.response && error.response.data){
      throw new Error(error.response.data.message || "Somethig went wrong");
    }
    throw new Error("Network error")
  }
}

// change sub admin active status 

export const changeSubadminActiveStatusApi = async (details)=>{
  
  try{
    const jwt = localStorage.getItem("jwt"); // Assuming the token is stored with the key 'token'
    const response = await privateAPI.post(Apiconfig.adminActiveStatus,details,
      // {
      //   headers: {
      //     Authorization: `Bearer ${jwt}`,
      //   },
      // }
    );
    return details
  }catch(error){
    if(error.response && error.response.data){
      throw new Error(error.response.data.message || "Something went wrong")
    }
    throw new Error("Network Error")
  }
}


// edit admin password 

export const editAdminPasswordApi = async(details)=>{
  try{
    const response = await publicAPI.post(Apiconfig.resetAdminPassword,details);
    console.log("change password", response)
    return response
  }catch(error){
    console.log("error",error.response.data.message)
    if(error.response && error.response.data){
      throw new Error(error.response.data.message || "Something went wrong")
    }
    throw new Error("Network Error")
  }

}




