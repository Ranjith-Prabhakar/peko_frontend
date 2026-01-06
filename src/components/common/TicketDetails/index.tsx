// src/components/common/TicketDetails/index.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { Ticket } from "../../ui/Table/TicketTable/TicketTable";
import { markTicketViewed, updateTicketStatus } from "../../../services/ticket/update";
import TicketChat from "../../TicketChat";

interface TicketDetailsProps {
  role: "admin" | "user";
  ticket?: Ticket | null; // Optional if passed directly
}

const TicketDetails = ({ role, ticket: initialTicket }: TicketDetailsProps) => {
  const { state } = useLocation();
  const [ticket, setTicket] = useState<Ticket | null>(initialTicket ?? state?.ticket ?? null);
  const [pendingStatus, setPendingStatus] = useState<Ticket["status"]>(
    ticket?.status ?? "open"
  );
  const [savingStatus, setSavingStatus] = useState(false);
  const [markingViewed, setMarkingViewed] = useState(false);

  if (!ticket) {
    return <div className="p-6">Ticket not found</div>;
  }

  /** -----------------------------
   * Handle Actions
   * ----------------------------- */

  // Admin only: mark as viewed
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

  // Update ticket status (admin any status, user only 'closed')
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

  /** -----------------------------
   * Render
   * ----------------------------- */

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Ticket Info */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            <h2 className="text-xl font-bold">{ticket.title}</h2>
            <p className="text-gray-600">{ticket.description}</p>

            <div className="flex gap-3 flex-wrap">
              <span className="badge badge-outline">Priority: {ticket.priority}</span>
              <span className="badge badge-outline">Status: {ticket.status}</span>
              {role === "admin" && (
                <span className="badge badge-outline">
                  Viewed: {ticket.isViewedByAdmin ? "Viewed" : "Not Viewed"}
                </span>
              )}
            </div>

            {/* Admin only: Mark as viewed */}
            {role === "admin" && !ticket.isViewedByAdmin && (
              <button
                className="btn btn-outline btn-sm w-fit"
                onClick={handleMarkViewed}
                disabled={markingViewed}
              >
                {markingViewed ? "Marking..." : "Mark as Viewed"}
              </button>
            )}

            {/* Status Actions */}
            <div className="space-y-2">
              <label className="label font-semibold">
                {role === "admin" ? "Update Status" : "Ticket Status"}
              </label>

              {role === "admin" ? (
                <>
                  <select
                    className="select select-bordered w-full"
                    value={pendingStatus}
                    onChange={(e) => setPendingStatus(e.target.value as Ticket["status"])}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    className="btn btn-primary w-full"
                    onClick={() => handleUpdateStatus()}
                    disabled={savingStatus || pendingStatus === ticket.status}
                  >
                    {savingStatus ? "Updating..." : "Update Status"}
                  </button>
                </>
              ) : (
                ticket.status !== "closed" && (
                  <button
                    className="btn btn-error w-full"
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

        {/* Conversation / Chat */}
        <TicketChat ticketId={ticket.id} role={role} />
      </div>
    </div>
  );
};

export default TicketDetails;
