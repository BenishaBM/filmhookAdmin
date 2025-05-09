import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import privateApi from "../../api/privateApi";
import axios from "axios";
import {
  getUnVerifiedIndustrialUserListAPI,
  getUnverfiedIndustrialUserDetailsAPI,
  getUnverifiedProfilesAPI,
 
} from "../../api/industrialUser";
import { TrophyIcon } from "@heroicons/react/24/solid";
import Apiconfig from "../../api/Apiconfig";
import { act } from "react";

// not verified industrial user list
const jwt = localStorage.getItem("jwt");


export const getUnverifiedIndustrialUserListAction = createAsyncThunk(
  "industrialUser/getUnverifiedIndustrialUserListAction",
  async (pageDetails, { rejectWithValue }) => {
    try {
      const response = await getUnVerifiedIndustrialUserListAPI(pageDetails);
      return response.UserDetails;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUnverifiedIndustrialUserDetailsAction = createAsyncThunk(
  "industrialUser/getUnverifiedIndustrialUserDetailsAction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getUnverfiedIndustrialUserDetailsAPI(id);
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUnverifiedProfileFilesAction = createAsyncThunk(
  "industrialUser/getUnverifiedProfileFilesAction",
  async(userid,{ rejectWithValue })=>{
    try{
      const response = await getUnverifiedProfilesAPI(userid);
      return response
    }catch(error){
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)


// export const getprofileinfo = createAsyncThunk("industiralUser/getprofileinfo", async(details, {rejectWithValue}) =>{
//   try {
//     const response = await privateApi.get(Apiconfig.profileinfo,{params: details})
//     console.log(response.data)
//     return response.data
    
//   } catch (error) {
//     return rejectWithValue(error.response?.data || error.message)
    
//   }
// })



export const unVerifiedIndustrialUserSlice = createSlice({
  name: "industrialUser",
  initialState: {
    unVerifiedIndustrialUserList: [],
    getListLoadingStatus: "idle",
    getListErrorMessage: null,
    unverifiedIndestiraluserDetails: [],
    getDetailsLoadingStatus: "idle",
    getDetailsErrorMessage: null,
    unverifiedUserFiles: [],
    unverifiedUserFilesLoadingStatus: "idel",
    unverifiedUserFilesErrorMessage: null,
    // getInfoList : [],
    // getInfoLoadingStatus : "idle",
    // getInfoErrorMessage : null
  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnverifiedIndustrialUserListAction.pending, (state) => {
        state.getListLoadingStatus = "loading";
        state.getListErrorMessage = null;
      })
      .addCase(
        getUnverifiedIndustrialUserListAction.fulfilled,
        (state, action) => {
          state.getListLoadingStatus = "succeeded";
          state.getListErrorMessage = null;
          state.unVerifiedIndustrialUserList = action.payload;
        }
      )
      .addCase(
        getUnverifiedIndustrialUserListAction.rejected,
        (state, action) => {
          state.getListLoadingStatus = "failed";
          state.getListErrorMessage = action.error.message;
        }
      )
      .addCase(getUnverifiedIndustrialUserDetailsAction.pending, (state) => {
        state.getDetailsLoadingStatus = "loading";
        state.getDetailsErrorMessage = null;
      })
      .addCase(
        getUnverifiedIndustrialUserDetailsAction.fulfilled,
        (state, action) => {
          state.getDetailsLoadingStatus = "succeeded"; 
          state.getDetailsErrorMessage = null;
          state.unverifiedIndestiraluserDetails = action.payload;
        }
      )
      .addCase(
        getUnverifiedIndustrialUserDetailsAction.rejected,
        (state, action) => {
          state.getDetailsLoadingStatus = "failed";
          state.getDetailsErrorMessage = action.error.message;
        }
      )
      .addCase(getUnverifiedProfileFilesAction.pending , (state)=>{
        state. unverifiedUserFilesLoadingStatus= "loading";
        state.unverifiedUserFilesErrorMessage = null;
      }
      )
      .addCase(
        getUnverifiedProfileFilesAction.fulfilled , (state,action)=>{
          state. unverifiedUserFilesLoadingStatus= "succeeded";
          state.unverifiedUserFiles = action.payload;
        }
      )
      .addCase(getUnverifiedProfileFilesAction.rejected , (state,action)=>{
        state. unverifiedUserFilesLoadingStatus= "failed";
        state.unverifiedUserFilesErrorMessage = action.error.message;
      }
      )
      // .addCase(getprofileinfo.pending, (state)=>{
      //   state.getInfoLoadingStatus = "loading";
      //   state.getInfoErrorMessage = null
        
      // })
      // .addCase(getprofileinfo.fulfilled, (state,action)=>{
      //   state.getInfoLoadingStatus = "succeed";
      //   state.getInfoList = action.payload
      //   console.log(state.getInfoList)
      // })
      // .addCase(getprofileinfo.rejected, (state,action)=>{
      //   state.getInfoLoadingStatus = "failed";
      //   state.getInfoErrorMessage = action.error.message;
      // })
     
  },
});


export const profileinfovalue = (state) => state.industrialUser.getInfoList

export default unVerifiedIndustrialUserSlice.reducer;
