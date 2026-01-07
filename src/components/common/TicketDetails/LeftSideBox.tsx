import type { Ticket } from "../../ui/Table/TicketTable/TicketTable";

type LeftSideBoxProps = {
  ticket: Ticket;
  role: "admin" | "user";
  pendingStatus: Ticket["status"];
  setPendingStatus: (status: Ticket["status"]) => void;
  savingStatus: boolean;
  handleUpdateStatus: (status?: Ticket["status"]) => void;
  markingViewed: boolean;
  handleMarkViewed: () => void;
  priorityColors: Record<Ticket["priority"], string>;
  statusColors: Record<Ticket["status"], string>;
};

const LeftSideBox = ({
  ticket,
  role,
  pendingStatus,
  setPendingStatus,
  savingStatus,
  handleUpdateStatus,
  markingViewed,
  handleMarkViewed,
  priorityColors,
  statusColors,
}: LeftSideBoxProps) => {
  return (
    <div className="bg-gray-900 border border-white/10 rounded-lg shadow-xl flex flex-col max-h-[100vh] flex-1">
      {/* Scrollable content */}
      <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
        {/* Ticket Heading */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 text-center">{ticket.title}</h2>
          <p className="text-white/70 text-sm">
            Ticket ID: <span className="font-semibold">{ticket.id}</span>
          </p>
        </div>

        {/* Description */}
        <div className="bg-gray-800 p-4 rounded-md text-white/80 overflow-y-scroll max-h-[50vh] h-[50vh]">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm">{ticket.description}</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[ticket.priority]}`}
          >
            Priority: {ticket.priority}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[ticket.status]}`}
          >
            Status: {ticket.status.replace("_", " ")}
          </span>

          {role === "admin" && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                ticket.isViewedByAdmin ? "bg-green-600 text-white" : "bg-red-500 text-white"
              }`}
            >
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
  );
};

export default LeftSideBox;
