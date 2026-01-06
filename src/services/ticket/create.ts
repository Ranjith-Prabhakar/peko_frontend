import axios from "../../api/axiosInstance";
import type { TicketFormValues } from "../../types/ticket";

export const createTicket = async (payLoad:TicketFormValues) => {
  try {
    const response = await axios.post("/ticket/create",payLoad, {
      withCredentials: true,
      requiresAuth: true
    });
    console.log("Create ticket response:99999999999", response);
    const { status ,data } = response;
    return { status, data };
   
  } catch (error) {
    console.error("Failed to create ticket:", error);
     throw error;
  }
};
