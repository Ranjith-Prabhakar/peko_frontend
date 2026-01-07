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

  return (
    <div className="p-6 flex justify-center">
      <div
        className="
          w-full max-w-6xl
          grid grid-cols-1 md:grid-cols-2 gap-6
          h-[70vh]
        "
      >
        <div className="bg-gray-900 border border-white/10 rounded-lg shadow-xl flex flex-col h-full">
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold text-white">
              {ticket.title}
            </h2>

            <p className="text-white/70">
              {ticket.description}
            </p>

            <div className="flex gap-3 flex-wrap">
              <span className="badge badge-outline text-white border-white/30">
                Priority: {ticket.priority}
              </span>

              <span className="badge badge-outline text-white border-white/30">
                Status: {ticket.status}
              </span>

              {role === "admin" && (
                <span className="badge badge-outline text-white border-white/30">
                  Viewed: {ticket.isViewedByAdmin ? "Viewed" : "Not Viewed"}
                </span>
              )}
            </div>

            {role === "admin" && !ticket.isViewedByAdmin && (
              <button
                className="
                  btn btn-sm
                  bg-gray-900
                  border border-white/20
                  text-white
                  hover:bg-indigo-500/10
                  hover:border-indigo-400/40
                "
                onClick={handleMarkViewed}
                disabled={markingViewed}
              >
                {markingViewed ? "Marking..." : "Mark as Viewed"}
              </button>
            )}

            <div className="space-y-2">
              <label className="label font-semibold text-white">
                {role === "admin" ? "Update Status" : "Ticket Status"}
              </label>

              {role === "admin" ? (
                <>
                  <select
                    className="
                      select w-full
                      bg-gray-900
                      border border-white/20
                      text-white
                      focus:outline-none
                      focus:border-indigo-400/50
                    "
                    value={pendingStatus}
                    onChange={(e) =>
                      setPendingStatus(e.target.value as Ticket["status"])
                    }
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    className="
                      btn w-full
                      bg-indigo-600/90
                      hover:bg-indigo-600
                      border-none
                      text-white
                    "
                    onClick={() => handleUpdateStatus()}
                    disabled={savingStatus || pendingStatus === ticket.status}
                  >
                    {savingStatus ? "Updating..." : "Update Status"}
                  </button>
                </>
              ) : (
                ticket.status !== "closed" && (
                  <button
                    className="
                      btn w-full
                      bg-red-500/90
                      hover:bg-red-500
                      border-none
                      text-white
                    "
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

        <div className="bg-gray-900 border border-white/10 rounded-lg shadow-xl flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <TicketChat
              ticketId={ticket.id}
              currentUserId={Number(user?.id)}
              currentUserName={user?.name as string}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
