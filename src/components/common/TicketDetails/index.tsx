import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { Ticket } from "../../ui/Table/TicketTable/TicketTable";
import { markTicketViewed, updateTicketStatus } from "../../../services/ticket/update";
import TicketChat from "../../TicketChat";
import useGetUser from "../../../hooks/useGetUser";
import LeftSideBox from "./LeftSideBox";

interface TicketDetailsProps {
  role: "admin" | "user";
  ticket?: Ticket | null;
}

const TicketDetails = ({ role, ticket: initialTicket }: TicketDetailsProps) => {
  const user = useGetUser();
  const { state } = useLocation();

  const [ticket, setTicket] = useState<Ticket | null>(
    initialTicket ?? state?.ticket ?? null
  );
  const [pendingStatus, setPendingStatus] = useState<Ticket["status"]>(
    ticket?.status ?? "open"
  );
  const [savingStatus, setSavingStatus] = useState(false);
  const [markingViewed, setMarkingViewed] = useState(false);

  if (!ticket) {
    return (
      <div className="p-6 text-white/60 bg-gray-900 border border-white/10 rounded-md">
        Ticket not found
      </div>
    );
  }

  const handleMarkViewed = async () => {
    if (role !== "admin") return;
    try {
      setMarkingViewed(true);
      const updatedTicket = await markTicketViewed(ticket.id);
      setTicket(updatedTicket);
    } finally {
      setMarkingViewed(false);
    }
  };

  const handleUpdateStatus = async (status?: Ticket["status"]) => {
    const newStatus = role === "user" ? "closed" : status ?? pendingStatus;
    try {
      setSavingStatus(true);
      const updatedTicket = await updateTicketStatus(ticket.id, newStatus);
      setTicket(updatedTicket);
      setPendingStatus(updatedTicket.status);
    } finally {
      setSavingStatus(false);
    }
  };

  const priorityColors: Record<Ticket["priority"], string> = {
    high: "bg-red-600 text-white",
    medium: "bg-yellow-400 text-black",
    low: "bg-green-500 text-white",
  };

  const statusColors: Record<Ticket["status"], string> = {
    open: "bg-blue-500 text-white",
    in_progress: "bg-indigo-500 text-white",
    resolved: "bg-green-500 text-white",
    closed: "bg-gray-500 text-white",
  };

  return (

<>
        <div className="flex max-h-[90vh] w-[85vw] h-full overflow-scroll gap-4 ">
          
      <LeftSideBox
          ticket={ticket}
          role={role}
          pendingStatus={pendingStatus}
          setPendingStatus={setPendingStatus}
          savingStatus={savingStatus}
          handleUpdateStatus={handleUpdateStatus}
          markingViewed={markingViewed}
          handleMarkViewed={handleMarkViewed}
          priorityColors={priorityColors}
          statusColors={statusColors}
         />

            <TicketChat
              ticketId={ticket.id}
              currentUserId={Number(user?.id)}
              currentUserRole={role}
              currentUserName={user?.name as string}
              targetUserId={ticket.user?.id}
            /> 
      
        </div>

    </>
  );
};

export default TicketDetails;



