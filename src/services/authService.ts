import axios from "../api/axiosInstance";

export const refreshAccessToken = async () => {
  try {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    const { accessToken, user } = response.data;

    return { accessToken, user };
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
