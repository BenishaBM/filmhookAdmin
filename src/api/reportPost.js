import publicAPI from "./publicApi";
import Apiconfig from "./Apiconfig";
import privateAPI from "./privateApi";

// get all report 

export const getallPostReportApi = async (pageDetails) =>{
    try{
      const response = await privateAPI.post(Apiconfig.allpostreport,pageDetails);
    //   console.log("getall report",response.data);
      return response.data;
    }catch(error){
      console.log("error: ", error.response);
      throw Error(error.response);
    }
  }
  