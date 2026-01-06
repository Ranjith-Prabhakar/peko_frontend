import { useNavigate } from "react-router-dom";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "resolved" | "closed";
  isViewedByAdmin: boolean;
};

type Props = {
  tickets: Ticket[];
  isAdmin: boolean;
};

const TicketTable = ({ tickets, isAdmin }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            {isAdmin && <th>Viewed</th>}
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={ticket.id}
              className="hover cursor-pointer"
             onClick={() =>
                  navigate(
                    `/${isAdmin ? "admin" : "user"}/tickets/${ticket.id}`,
                    { state: { ticket } }  
                  )
                }
               >
              <td>{index + 1}</td>
              <td className="font-medium">{ticket.title}</td>
              <td className="truncate max-w-xs">
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
              <td>{ticket.status}</td>

              {isAdmin && (
                <td>
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
