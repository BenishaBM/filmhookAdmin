import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import unVerifiedIndustrialUserReducer from "../slices/notVerifiedIndustrialUserSlice";
import subadminReducer from "../slices/subAdminSlice";
import reportPostsReducer from "../slices/reportPostsSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        industrialUser: unVerifiedIndustrialUserReducer,
        subadmin: subadminReducer,
        reportPost:reportPostsReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware), // Add custom middleware if needed
    // devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

export default store;
