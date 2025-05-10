

import Apiconfig from "../../api/Apiconfig";
import privateAPI from "../../api/privateApi";
// import { getalluservalue } from "../../api/reportPost";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getUserAction = createAsyncThunk(
  "industrialUser/getUserAction",
  async (pageDetails, { rejectWithValue }) => {
    try {
      const response = await privateAPI.get(Apiconfig.getAllUsers, {
        params: pageDetails,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPublicUserAction = createAsyncThunk(
  "industrialUser/getPublicUserAction",
  async (pageDetails, { rejectWithValue }) => {
    try {
      const response = await privateAPI.get(Apiconfig.getpublicuser, {
        params: pageDetails,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const getIndustryUserAction = createAsyncThunk(
  "industrialUser/getIndustryUserAction",
  async (pageDetails, { rejectWithValue }) => {
    try {
      const response = await privateAPI.get(Apiconfig.getpublicuser, {
        params: pageDetails,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    getAllUserdetailsLoadingStatus: "idle",
    getAllUserdetailsLoadingErrorMsg: null,
    getAllUserdetailsList: [],
    getuservalues: 0,
    getAllPublicUserLoadingStatus : "idle",
    getAllPublicUserLoadingErrorMsg : null,

    getAllPublicUserList : [],
    getAllIndustryUserLoadingStatus : "idle",
    getAllIndustryUserLoadingErrorMsg : null,

    getAllIndustryUserList : []
  },
  reducers: {
    increasecount: (state) => {
      state.getuservalues += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAction.pending, (state) => {
        state.getAllUserdetailsLoadingStatus = "loading";
        state.getAllUserdetailsLoadingErrorMsg = null;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.getAllUserdetailsLoadingStatus = "succeeded";
        state.getAllUserdetailsList = action.payload.data.users;
        
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.getAllUserdetailsLoadingStatus = "failed";
        state.getAllUserdetailsLoadingErrorMsg = action.payload;
      })

      .addCase(getPublicUserAction.pending, (state) => {
        state.getAllPublicUserLoadingStatus= "loading";
        state.getAllPublicUserLoadingErrorMsg = null;
      })
      .addCase(getPublicUserAction.fulfilled, (state, action) => {
        state.getAllPublicUserLoadingStatus = "succeeded";
        state.getAllPublicUserList = action.payload.data.users;
        
      })
      .addCase(getPublicUserAction.rejected, (state, action) => {
        state.getAllPublicUserLoadingStatus = "failed";
        state.getAllPublicUserLoadingErrorMsg = action.payload;
      })
      .addCase(getIndustryUserAction.pending, (state) => {
        state.getAllIndustryUserLoadingStatus= "loading";
        state.getAllIndustryUserLoadingErrorMsg = null;
      })
      .addCase(getIndustryUserAction.fulfilled, (state, action) => {
        state.getAllIndustryUserLoadingStatus = "succeeded";
        state.getAllIndustryUserList  = action.payload.data.users;
        
      })
      .addCase(getIndustryUserAction.rejected, (state, action) => {
        state.getAllIndustryUserLoadingStatus = "failed";
        state.getAllIndustryUserLoadingErrorMsg = action.payload;
      });
  },
});

export const valuees = (state) => state.userManagement.getuservalues;
export const uservalues = (state) => state.userManagement.getAllUserdetailsList;
export const publicuservalues = (state) => state.userManagement.getAllPublicUserList;
export const Industryuservalues = (state) => state.userManagement.getAllIndustryUserList;
export const { increasecount } = userManagementSlice.actions;
export default userManagementSlice.reducer;