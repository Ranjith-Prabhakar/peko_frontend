import axios from "../../api/axiosInstance";
import type { TicketFormValues } from "../../types/ticket";

export const createTicket = async (payLoad:TicketFormValues) => {
  try {
    const response = await axios.post("/ticket/create",payLoad, {
      withCredentials: true,
      requiresAuth: true
    });
    const { status ,data } = response.data;
    return { status, data };
   
  } catch (error) {
    console.error("Failed to create ticket:", error);
     throw error;
  }
};
