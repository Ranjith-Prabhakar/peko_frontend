import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Ticket } from "../../../components/ui/Table/TicketTable";
import { markTicketViewed, updateTicketStatus } from "../../../services/ticket/update";

const TicketDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(state?.ticket ?? null);
  const [status, setStatus] = useState(ticket?.status);

  useEffect(() => {
    if (ticket && !ticket.isViewedByAdmin) {
      markTicketViewed(ticket.id);
      setTicket({ ...ticket, isViewedByAdmin: true });
    }
  }, [ticket]);

  if (!ticket) {
    return <div className="p-6">Ticket not found</div>;
  }

  const handleStatusChange = async (newStatus: Ticket["status"]) => {
    await updateTicketStatus(ticket.id, newStatus);
    setStatus(newStatus);
    setTicket({ ...ticket, status: newStatus });
  };

  return (
    <div className="p-6 flex justify-start">
      <div className="w-full max-w-5xl grid grid-cols-2 gap-6">

        {/* ticket Info */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body space-y-4">
            <button className="btn btn-sm w-fit" onClick={() => navigate(-1)}>
              ← Back
            </button>

            <h2 className="text-xl font-bold">{ticket.title}</h2>
            <p className="text-gray-600">{ticket.description}</p>

            <div className="flex gap-3">
              <span className="badge badge-outline">
                Priority: {ticket.priority}
              </span>
              <span className="badge badge-outline">
                Status: {ticket.status}
              </span>
            </div>

            {/* status */}
            <div>
              <label className="label font-semibold">Update Status</label>
              <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as Ticket["status"])
                }
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/*chat  */}
        <div className="card bg-base-100 shadow-xl flex flex-col">
          <div className="card-body flex flex-col h-full">
            <h3 className="font-semibold">Conversation</h3>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-base-200 rounded">
              <div className="chat chat-start">
                <div className="chat-bubble">User message here</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  Admin reply here
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered w-full"
              />
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketDetails;
