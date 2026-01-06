import axios from "../../api/axiosInstance";

export const markTicketViewed = (ticketId: number) =>
  axios.patch(`/ticket/${ticketId}/viewed`, {
    withCredentials: true,
    requiresAuth: true,
  });

export const updateTicketStatus = (
  ticketId: number,
  status: string
) =>
  axios.patch(`/ticket/${ticketId}/status`, {
    status,
    withCredentials: true,
    requiresAuth: true,
  });
