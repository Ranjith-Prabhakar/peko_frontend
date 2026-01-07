import { useNavigate } from "react-router-dom";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "resolved" | "closed";
  isViewedByAdmin: boolean;
  user:{id:number,name:string}
  createdAt:string
};

type Props = {
  tickets: Ticket[];
  isAdmin: boolean;
};

const TicketTable = ({ tickets, isAdmin }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto min-h-[70vh] ">
      <table className="table table-sm border border-white/10 bg-gray-900 p-4">
        <thead className="text-white border-b border-white/20">
          <tr>
            <th>Id</th>
            <th>Created By</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Created At</th>
            <th>Status</th>
            {isAdmin && <th>Viewed</th>}
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={ticket.id}
              onClick={() =>
                navigate(
                  `/${isAdmin ? "admin" : "user"}/tickets/${ticket.id}`,
                  { state: { ticket } }
                )
              }
              className="
                cursor-pointer
                border-b border-white/10
                transition-all duration-200
                hover:bg-indigo-500/10
                hover:border-indigo-400/40
                last:border-b-0
              "
            >
              <td className="opacity-80">{index + 1}</td>
              <td className="font-medium text-white">
                {ticket.user.name}
              </td>
              <td className="font-medium text-white">
                {ticket.title}
              </td>

              <td className="truncate max-w-xs opacity-80">
                {ticket.description}
              </td>

              <td>
                <span
                  className={`badge ${
                    ticket.priority === "high"
                      ? "badge-error"
                      : ticket.priority === "medium"
                      ? "badge-warning"
                      : "badge-success"
                  }`}
                >
                  {ticket.priority}
                </span>
              </td>


              <td className="capitalize opacity-80">
                {ticket.createdAt.split("T")[0]}
              </td>
              <td className="capitalize opacity-80">
                {ticket.status.replace("_", " ")}
              </td>

              {isAdmin && (
                <td className="opacity-80">
                  {ticket.isViewedByAdmin ? "Viewed" : "Not Viewed"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
