import axios from "../../api/axiosInstance";

export const fetchMessages = async (ticketId: number) => {
  try {
    const response = await axios.get(`/ticket/${ticketId}/messages`, {
      withCredentials: true,
      requiresAuth: true,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw error;
  }
};
