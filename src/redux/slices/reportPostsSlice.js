import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getallPostReportApi } from "../../api/reportPost";

// get all post report
export const getAllPostReportAction = createAsyncThunk(
  "industrialUser/getAllPostReportAction",
  async (pageDetails, { rejectWithValue }) => {
    try {
      const response = await getallPostReportApi(pageDetails);
      return response.combinedDetailsList;
    } catch (error) {
      console.log("redux", error.response);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const reportPostsSlice = createSlice({
  name: "reportPost",
  initialState: {
    getAllpostReportLoadingStatus: "idle",
    getAllpostReportLoadingErrorMsg: null,
    getAllPostReportList: [],
    reportPostFiles: [],
    reportPostUsers:[]
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
      });
  },
});

// Exporting the reducer
export default reportPostsSlice.reducer;

// Exporting the action creator
export const { setReportPostFiles,setRepotUserDetails } = reportPostsSlice.actions;
