import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicAPI from "../../api/publicApi";
import Apiconfig from "../../api/Apiconfig";
import { editAdminPasswordApi} from "../../api/subadminServices";


// login users
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await publicAPI.post("/user/logins", credentials);
      const data = await response.data;
      localStorage.setItem("userName", data.username);
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("email", data.email);
      return data;
    } catch (error) {
      // {error && <p style={{ color: 'red' }}>{error}</p>}

      // console.log(rejectWithValue(error.response.data.message))
      return rejectWithValue(error.response.data.message);
    }
  }
);

// logout users
export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log("error at userLogout function", error);
    throw Error(error.response.data.message);
  }
});

// reset user password
export const resetUserPasswordAction = createAsyncThunk(
  "changepassword/resetUserPasswordAction",
  async (details, { rejectWithValue }) => {
    try {
      const response = await editAdminPasswordApi(details);
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    loading: false,
    loginError: null,
    username: localStorage.getItem("userName") || null,
    jwt: localStorage.getItem("jwt") || null,
    email: localStorage.getItem("email") || null,
    userType: localStorage.getItem("userType") || null,
    resetAdminPasswordStatus: "idel",
    resetAdminPasswordErrorMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.jwt = action.payload.jwt;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.userType = action.payload.userType;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
      })
      .addCase(resetUserPasswordAction.pending, (state) => {
        state.resetAdminPasswordStatus = "loading";
        state.resetAdminPasswordErrorMsg = null;
      })
      .addCase(resetUserPasswordAction.fulfilled, (state) => {
        state.resetAdminPasswordStatus = "succeeded";
        state.resetAdminPasswordErrorMsg = null;
      })
      .addCase(resetUserPasswordAction.rejected, (state, action) => {
        state.resetAdminPasswordStatus = "failed";
        state.resetAdminPasswordErrorMsg = action.error.message;
      });
  },
});

// reset password
export const resetPasswordAction = createAsyncThunk();

export const getUserDetails = (state) => state.login.user;
export const getUsername = (state) => state.login.username;
export const getUserEmail = (state) => state.login.email;
export const getUserType = (state) => state.login.userType;
export const selectJwt = (state) => state.login.jwt;
export const selectLoginError = (state) => state.login.loginError;

export default loginSlice.reducer;
