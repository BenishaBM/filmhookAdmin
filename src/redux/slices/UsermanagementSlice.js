// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import privateApi from "../../api/privateApi";

// // Get all users with pagination
// export const getAllUsersAction = createAsyncThunk(
//   "userManagement/getAllUsersAction",
//   async (pageDetails = { page: 1, limit: 10, search: "" }, { rejectWithValue }) => {
//     try {
//       // Add default values to ensure consistency
//       const page = pageDetails.page || 1;
//       const limit = pageDetails.limit || 10;
//       const search = pageDetails.search || "";

//       // Debug the parameters being sent
//       console.log("Fetching users with params:", { page, limit, search });

//       const response = await privateApi.get("/user/getAllUsers", {
//         params: {
//           page,
//           limit,
//           search
//         }
//       });

//       // Debug the response structure
//       console.log("API response structure:", response.data);

//       return response.data.data;
//     } catch (error) {
//       console.log("error getting users list ", error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// // Rest of the thunks remain the same...
// export const getUserDetailsAction = createAsyncThunk(
//   "userManagement/getUserDetailsAction",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await privateApi.get(`/user/getUserDetails?userId=${userId}`);
//       return response.data.data;
//     } catch (error) {
//       console.log("error getting user details ", error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateUserStatusAction = createAsyncThunk(
//   "userManagement/updateUserStatusAction",
//   async (statusDetails, { rejectWithValue }) => {
//     try {
//       const response = await privateApi.post("/user/updateUserStatus", statusDetails);
//       return response.data;
//     } catch (error) {
//       console.log("error updating user status ", error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const deleteUserAction = createAsyncThunk(
//   "userManagement/deleteUserAction",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await privateApi.delete(`/user/deleteUser?userId=${userId}`);
//       return { userId, ...response.data };
//     } catch (error) {
//       console.log("error deleting user ", error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const userManagementSlice = createSlice({
//   name: "userManagement",
//   initialState: {
//     usersList: [],
//     totalUsers: 0,
//     currentPage: 1,
//     usersListLoadingStatus: "idle",
//     usersListErrorMessage: null,

//     userDetails: null,
//     userDetailsLoadingStatus: "idle",
//     userDetailsErrorMessage: null,

//     actionStatus: "idle",
//     actionErrorMessage: null,
//     actionSuccessMessage: null,
//   },
//   reducers: {
//     resetActionStatus: (state) => {
//       state.actionStatus = "idle";
//       state.actionErrorMessage = null;
//       state.actionSuccessMessage = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Get all users
//       .addCase(getAllUsersAction.pending, (state) => {
//         state.usersListLoadingStatus = "loading";
//         state.usersListErrorMessage = null;
//       })
//       .addCase(getAllUsersAction.fulfilled, (state, action) => {
//         state.usersListLoadingStatus = "succeeded";
//         state.usersListErrorMessage = null;

//         // Enhanced response structure handling with better logging
//         console.log("Processing users response:", action.payload);

//         if (action.payload) {
//           // If we have any payload at all, let's handle all possible structures
//           if (action.payload.users && Array.isArray(action.payload.users)) {
//             // Structure: { users: [...], totalCount: n, currentPage: n }
//             state.usersList = action.payload.users;
//             state.totalUsers = action.payload.totalCount || action.payload.users.length;
//             state.currentPage = action.payload.currentPage || 1;
//           } else if (Array.isArray(action.payload)) {
//             // Structure: Direct array of users
//             state.usersList = action.payload;
//             state.totalUsers = action.payload.length;
//           } else if (action.payload.data && Array.isArray(action.payload.data)) {
//             // Structure: { data: [...], total: n, page: n }
//             state.usersList = action.payload.data;
//             state.totalUsers = action.payload.total || action.payload.data.length;
//             state.currentPage = action.payload.page || 1;
//           } else {
//             // Fallback - try to convert to array if possible
//             const possibleUsers = Object.values(action.payload).find(item => Array.isArray(item));
//             if (possibleUsers) {
//               state.usersList = possibleUsers;
//               state.totalUsers = possibleUsers.length;
//             } else {
//               console.error("Unexpected response structure:", action.payload);
//               state.usersList = [];
//               state.totalUsers = 0;
//             }
//           }
//         } else {
//           // No data received
//           state.usersList = [];
//           state.totalUsers = 0;
//         }
//       })
//       .addCase(getAllUsersAction.rejected, (state, action) => {
//         state.usersListLoadingStatus = "failed";
//         state.usersListErrorMessage = action.payload?.message || action.error.message;
//       })

//       // Rest of reducers remain the same...
//       .addCase(getUserDetailsAction.pending, (state) => {
//         state.userDetailsLoadingStatus = "loading";
//         state.userDetailsErrorMessage = null;
//       })
//       .addCase(getUserDetailsAction.fulfilled, (state, action) => {
//         state.userDetailsLoadingStatus = "succeeded";
//         state.userDetailsErrorMessage = null;
//         state.userDetails = action.payload;
//       })
//       .addCase(getUserDetailsAction.rejected, (state, action) => {
//         state.userDetailsLoadingStatus = "failed";
//         state.userDetailsErrorMessage = action.payload?.message || action.error.message;
//       })

//       .addCase(updateUserStatusAction.pending, (state) => {
//         state.actionStatus = "loading";
//         state.actionErrorMessage = null;
//       })
//       .addCase(updateUserStatusAction.fulfilled, (state, action) => {
//         state.actionStatus = "succeeded";
//         state.actionSuccessMessage = "User status updated successfully";
//         // Update the user in the list
//         if (state.usersList.length > 0) {
//           state.usersList = state.usersList.map(user => 
//             user._id === action.payload.userId ? { ...user, isActive: action.payload.isActive } : user
//           );
//         }
//       })
//       .addCase(updateUserStatusAction.rejected, (state, action) => {
//         state.actionStatus = "failed";
//         state.actionErrorMessage = action.payload?.message || action.error.message;
//       })

//       .addCase(deleteUserAction.pending, (state) => {
//         state.actionStatus = "loading";
//         state.actionErrorMessage = null;
//       })
//       .addCase(deleteUserAction.fulfilled, (state, action) => {
//         state.actionStatus = "succeeded";
//         state.actionSuccessMessage = "User deleted successfully";
//         // Remove the user from the list
//         if (state.usersList.length > 0) {
//           state.usersList = state.usersList.filter(user => user._id !== action.payload.userId);
//         }
//       })
//       .addCase(deleteUserAction.rejected, (state, action) => {
//         state.actionStatus = "failed";
//         state.actionErrorMessage = action.payload?.message || action.error.message;
//       });
//   }
// });

// export const { resetActionStatus } = userManagementSlice.actions;
// export default userManagementSlice.reducer;

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