import axios from "../../api/axiosInstance";
import type { Ticket } from "../../components/ui/Table/TicketTable/TicketTable";

export const markTicketViewed = async (
  ticketId: number
): Promise<Ticket> => {
  const response = await axios.patch(
    `/ticket/${ticketId}/viewed`,
    {},
    {
      withCredentials: true,
      requiresAuth: true,
    }
  );

  return response.data.data as Ticket;
};

export const updateTicketStatus = async (
  ticketId: number,
  status: Ticket["status"]
): Promise<Ticket> => {
  const response = await axios.patch(
    `/ticket/${ticketId}/status`,
    { status },
    {
      withCredentials: true,
      requiresAuth: true,
    }
  );

  return response.data.data as Ticket;
};
