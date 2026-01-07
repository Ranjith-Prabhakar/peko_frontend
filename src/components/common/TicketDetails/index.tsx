import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { Ticket } from "../../ui/Table/TicketTable/TicketTable";
import { markTicketViewed, updateTicketStatus } from "../../../services/ticket/update";
import TicketChat from "../../TicketChat";
import useGetUser from "../../../hooks/useGetUser";

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

  console.log("ticket",ticket)
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

  // Badge color mapping
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
    <div className="flex justify-center max-h-[90vh] overflow-y-hidden p-2">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 h-[88vh]">

        {/* LEFT: Ticket Info */}
        <div className="bg-gray-900 border border-white/10 rounded-lg shadow-xl flex flex-col h-full">
          <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">

            {/* Ticket Heading */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 text-center">{ticket.title}</h2>
              <p className="text-white/70 text-sm">
                Ticket ID: <span className="font-semibold">{ticket.id}</span>
              </p>
            </div>

            {/* Description */}
            <div className="bg-gray-800 p-4 rounded-md text-white/80 h-[30vh]">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm">{ticket.description}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[ticket.priority]}`}>
                Priority: {ticket.priority}
              </span>

              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[ticket.status]}`}>
                Status: {ticket.status.replace("_", " ")}
              </span>

              {role === "admin" && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${ticket.isViewedByAdmin ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}>
                  {ticket.isViewedByAdmin ? "Viewed" : "Not Viewed"}
                </span>
              )}
            </div>

            {/* Admin Mark Viewed */}
            {role === "admin" && !ticket.isViewedByAdmin && (
              <button
                className="btn btn-sm bg-gray-800 border border-white/20 text-white hover:bg-indigo-500/20"
                onClick={handleMarkViewed}
                disabled={markingViewed}
              >
                {markingViewed ? "Marking..." : "Mark as Viewed"}
              </button>
            )}

            {/* Update Status */}
            <div className="space-y-2">
              <label className="label font-semibold text-white">
                {role === "admin" ? "Update Status" : "Ticket Status"}
              </label>

              {role === "admin" ? (
                <>
                  <select
                    className="select w-full bg-gray-800 border border-white/20 text-white focus:outline-none focus:border-indigo-400/50"
                    value={pendingStatus}
                    onChange={(e) => setPendingStatus(e.target.value as Ticket["status"])}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    className="btn w-full bg-indigo-600/90 hover:bg-indigo-600 border-none text-white"
                    onClick={() => handleUpdateStatus()}
                    disabled={savingStatus || pendingStatus === ticket.status}
                  >
                    {savingStatus ? "Updating..." : "Update Status"}
                  </button>
                </>
              ) : (
                ticket.status !== "closed" && (
                  <button
                    className="btn w-full bg-red-500/90 hover:bg-red-500 border-none text-white"
                    onClick={() => handleUpdateStatus("closed")}
                    disabled={savingStatus}
                  >
                    {savingStatus ? "Closing..." : "Close Ticket"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Chat */}
        <div className="bg-gray-900 border border-white/10 rounded-lg shadow-xl flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <TicketChat
              ticketId={ticket.id}
              currentUserId={Number(user?.id)}
              currentUserRole={role}
              currentUserName={user?.name as string}
              targetUserId={ticket.user.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
