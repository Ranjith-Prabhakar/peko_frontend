import axios from "../../api/axiosInstance";
import type { TicketFormValues } from "../../types/ticket";

export const createToken = async (payLoad:TicketFormValues) => {
  try {
    const response = await axios.post("/ticket/create",payLoad, {
      withCredentials: true,
      requiresAuth: true
    });

    console.log("response.data", response);
    console.log("response.data", response.data.data);

    // const { accessToken, data } = response.data.data;
    // return { accessToken, data };
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};
