import axios from "../api/axiosInstance";
export const refreshAccessToken = async () => {
  try {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    console.log("response.data", response.data.data);

    const { accessToken, data } = response.data.data;
    return { accessToken, data };
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};
