import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getallPostReportApi } from "../../api/reportPost";
import privateAPI from "../../api/privateApi";
import Apiconfig from "../../api/Apiconfig";


export const getAllPostReportAction  = createAsyncThunk("industrialUser/getAllPostReportAction",async(pageDetails,{rejectWithValue}) =>{

  try {
    const response = await getallPostReportApi(pageDetails);
    return response.combinedDetailsList;
    
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
    
  }
}
);


// totalreport showing integration

export const getTotalReportUsersCount = createAsyncThunk("industrialUser/getTotalUsersCount", async(_ , {rejectWithValue}) => {
  try {
    const response = await privateAPI.get(Apiconfig.getreportscount)
    return response.data
    
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
    
  }

}
);


// export const getUserAction  = createAsyncThunk("industrialUser/getUserAction",async(pageDetails,{rejectWithValue}) =>{

//   try {
//     const response = await getalluservalue(pageDetails);
//     console.log(response)
    
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message);
    
//   }
// }
// );

export const reportPostsSlice = createSlice({
  name: "reportPost",
  initialState: {
    getAllpostReportLoadingStatus: "idle",
    getAllpostReportLoadingErrorMsg: null,
    getAllPostReportList: [],
    reportPostFiles: [],
    reportPostUsers:[],
    getAllTotalReportLoadingStatus : "idle",
    getAllTotalReportLoadingErrorMsg : null,
    getAllTotalReportList : []

  },
  reducers: {
    setReportPostFiles: (state, action) => {
      state.reportPostFiles = action.payload;
    },
    setRepotUserDetails:(state,action ) =>{
        state.reportPostUsers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostReportAction.pending, (state) => {
        state.getAllpostReportLoadingStatus = "loading";
        state.getAllpostReportLoadingErrorMsg = null;
      })
      .addCase(getAllPostReportAction.fulfilled, (state, action) => {
        state.getAllpostReportLoadingStatus = "succeeded";
        state.getAllPostReportList = action.payload;
      })
      .addCase(getAllPostReportAction.rejected, (state, action) => {
        state.getAllpostReportLoadingStatus = "failed";
        state.getAllpostReportLoadingErrorMsg = action.payload;
      })
      .addCase(getTotalReportUsersCount.pending, (state) => {
        state.getAllTotalReportLoadingStatus = "loading";
        state.getAllTotalReportLoadingErrorMsg = null;
      })
      .addCase(getTotalReportUsersCount.fulfilled, (state, action) => {
        state.getAllTotalReportLoadingStatus = "succeeded";
        state.getAllTotalReportList = action.payload;
      })
      .addCase(getTotalReportUsersCount.rejected, (state, action) => {
        state.getAllTotalReportLoadingStatus = "failed";
        state.getAllTotalReportLoadingErrorMsg = action.payload;
      })
  },
});

// Exporting the reducer
export default reportPostsSlice.reducer;

// Exporting the action creator
export const { setReportPostFiles,setRepotUserDetails } = reportPostsSlice.actions;

// export the totalreportlist

export const totalreportvalue = (state) => state.reportPost.getAllTotalReportList.data
