import axios from "../../api/axiosInstance";
export const refreshAccessToken = async () => {
  try {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    const { accessToken, data } = response.data.data;
    return { accessToken, data };
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};
