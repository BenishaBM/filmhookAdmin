import axios from "axios";
import refreshToken from "./refreshToken";

// Create an axios instance
const privateAPI = axios.create({
  baseURL: "https://www.filmhooks.annulartech.net",
});

// Add request interceptor to attach JWT token to request headers    




privateAPI.interceptors.request.use(async (config) => {
  try {
    // Get JWT token from AsyncStorage
    const jwt = localStorage.getItem("jwt");

    // Check if JWT token exists
    if (!jwt) {
      throw new Error("JWT token not found");
    }

    // Attach JWT token to request headers
    config.headers.Authorization = ` Bearer ${jwt}`;
    return config;

  } catch (error) {
    console.error("Error attaching JWT token to request:", error.message);
    throw error;
  }
});

// Response interceptor to handle token refresh

privateAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._rtery) {
      originalRequest._retry = true;

      try {
        const refreshedToken = await refreshToken();
        localStorage.setItem("jwt", refreshedToken);
        originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
        return privateAPI(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError.message);
        throw refreshError;
      }
    }
    return Promise.reject(error);

  }
);

export default privateAPI;

