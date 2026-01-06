import axios from "../../api/axiosInstance";

export const fetchTicket = async (page: number) => {
  try {
    const response = await axios.get(`/ticket?page=${page}`, {
      withCredentials: true,
      requiresAuth: true
    });

    return response.data; 
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    throw error;
  }
};
