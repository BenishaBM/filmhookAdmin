import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSubadminListApi,
  createSubadminApi,
  deleteSubadminApi,
  editSubadminApi,
  changeSubadminActiveStatusApi,
  editAdminPasswordApi,
} from "../../api/subadminServices";
import { produce } from "immer";

export const getSubAdminListAction = createAsyncThunk(
  "subadmin/getSubAdminListAction",
  async (pageDetails, { rejectWithValue }) => {
    try {
      const response = await getSubadminListApi(pageDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createSubadminAction = createAsyncThunk(
  "subadmin/createSubadminAction",
  async (details, { rejectWithValue }) => {
    try {
      const response = await createSubadminApi(details);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSubadminAction = createAsyncThunk(
  "subadmin/deleteSubadminAction",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteSubadminApi(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editSubadminAction = createAsyncThunk(
  "subadmin/editSubadminAction",
  async (details, { rejectWithValue }) => {
    try {
      const response = await editSubadminApi(details);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changeSubadminActiveStatusAction = createAsyncThunk(
  "subadmin/changeSubadminActiveStatusAction",
  async (details, { rejectWithValue }) => {
    try {
      const response = await changeSubadminActiveStatusApi(details);
      console.log("response: ", response);
      return response;
    } catch (error) {
      return rejectWithValue(error || error.response);
    }
  }
);

export const editAdminPaswordAction = createAsyncThunk(
  "subadmin/editAdminPaswordAction",
  async (details, { rejectWithValue }) => {
    try {
      const response = await editAdminPasswordApi(details);
      console.log(response);
      return response;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error || error.response) || error.response.message;
    }
  }
);

const subAdminSlice = createSlice({
  name: "subadmin",
  initialState: {
    subadminList: [],
    subadminListLoadingStatus: "idle",
    subadminListLoadingErrorMsg: null,
    totalPages: null,
    totalRecords: null,
    createSubadminFormStatus: "idle",
    createSubadminErrorMsg: null,
    deleteSubadminStatus: "idle",
    deleteSubadminErrorMsg: null,
    editSubadminStatus: "idle",
    editSubadminErrorMsg: null,
    subadminActiveStatus: "idel",
    subadminActiveStatusErrorMsg: null,
    
  },
  reducers: {
    resetCreateSubadminFormStatus: (state) => {
      state.createSubadminFormStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubAdminListAction.pending, (state) => {
        state.subadminListLoadingStatus = "loading";
        state.subadminListLoadingErrorMsg = null;
      })
      .addCase(getSubAdminListAction.fulfilled, (state, action) => {
        state.subadminListLoadingStatus = "succeeded";
        state.subadminList = action.payload.Data;
        state.totalPages = action.payload.PageInfo.totalPages;
        state.totalRecords = action.payload.PageInfo.totalRecords;
      })
      .addCase(getSubAdminListAction.rejected, (state, action) => {
        state.subadminListLoadingStatus = "failed";
        state.subadminListLoadingErrorMsg = action.payload;
      })
      .addCase(createSubadminAction.pending, (state) => {
        state.createSubadminFormStatus = "loading";
        state.createSubadminErrorMsg = null;
      })
      .addCase(createSubadminAction.fulfilled, (state) => {
        state.createSubadminFormStatus = "succeeded";
        state.createSubadminErrorMsg = null;
      })
      .addCase(createSubadminAction.rejected, (state, action) => {
        state.createSubadminFormStatus = "failed";
        state.createSubadminErrorMsg = action.payload;
      })
      .addCase(deleteSubadminAction.pending, (state) => {
        state.deleteSubadminStatus = "loading";
        state.deleteSubadminErrorMsg = null;
      })
      .addCase(deleteSubadminAction.fulfilled, (state, action) => {
        state.deleteSubadminStatus = "succeeded";
        state.subadminList = state.subadminList.filter(
          (user) => user.userId !== action.payload
        );
        state.deleteSubadminErrorMsg = null;
      })
      .addCase(deleteSubadminAction.rejected, (state, action) => {
        state.deleteSubadminStatus = "failed";
        console.log("error message:", action.payload);
        state.deleteSubadminErrorMsg = action.payload;
      })
      .addCase(editSubadminAction.pending, (state) => {
        (state.editSubadminStatus = "loading"),
          (state.editSubadminErrorMsg = null);
      })
      .addCase(editSubadminAction.fulfilled, (state, action) => {
        state.editSubadminStatus = "succeeded";
        const index = state.subadminList.findIndex(
          (user) => user.userId === action.payload.userId
        );
        console.log(index);
        if (index !== -1) {
          state.subadminList[index] = action.payload;
        }
      })
      .addCase(editSubadminAction.rejected, (state, action) => {
        state.editSubadminStatus = "failed";
        state.editSubadminErrorMsg = action.payload;
      })
      //
      .addCase(changeSubadminActiveStatusAction.pending, (state, action) => {
        state.subadminActiveStatus = "loading";
      })
      .addCase(changeSubadminActiveStatusAction.fulfilled, (state, action) => {
        state.subadminActiveStatus = "succeeded";
        const index = state.subadminList.findIndex(
          (user) => user.userId === action.payload.userId
        );
        if (index !== -1) {
          state.subadminList[index] = {
            ...state.subadminList[index],
            adminPageStatus: action.payload.adminPageStatus,
          };
        }
      })
      .addCase(changeSubadminActiveStatusAction.rejected, (state, action) => {
        state.subadminActiveStatus = "failed";
        state.subadminActiveStatusErrorMsg = action.payload;
      })
      //
      .addCase(editAdminPaswordAction.pending, (state) => {
        state.editAdminPasswordStatus = "loading";
        state.editAdminPasswordErrorMsg = null;
      })
      .addCase(editAdminPaswordAction.fulfilled, (state) => {
        state.editAdminPasswordStatus = "succeeded";
        state.editAdminPasswordErrorMsg = null;
      })
      .addCase(editAdminPaswordAction.rejected, (state) => {
        state.editAdminPasswordStatus = "failed";
        state.editAdminPasswordErrorMsg = null;
      });
  },
});

export const selectTotalPages = (state) => state.subadmin.totalPages;
export const selectTotalRecords = (state) => state.subadmin.totalRecords;
export const selectCreateSubadminErrorMsg = (state) =>
  state.subadmin.createSubadminErrorMsg;
export const selectCreateSubadminFormStatus = (state) =>
  state.subadmin.createSubadminFormStatus;

export const selectUpdateSubadminErrorMsg = (state) =>
  state.subadmin.editSubadminErrorMsg;
export const selectUpdateSubadminFormStatus = (state) =>
  state.subadmin.editSubadminStatus;

export const selectSubadminByUserID = (state, userId) =>
  state.subadmin.subadminList.find((user) => user.userId === userId);

export default subAdminSlice.reducer;

export const { resetCreateSubadminFormStatus } = subAdminSlice.actions;
