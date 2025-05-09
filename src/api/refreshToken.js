import privateAPI from "./privateApi";

const refreshToken = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await privateAPI.post("user/refreshToken", {
      token: token,
    });

    // console.log("Refresh token response:", response.data); // Log the response for debugging
                                                      
    const newToken = response.data.jwt;
    // console.log("New token:", newToken);
    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error.message); // Log the specific error message
    return null;
  }
};

export default refreshToken;
