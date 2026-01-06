import { Link } from "react-router-dom";
import type { TicketNotification } from "../../../../types/notification.type";

export function getTypeLabel(type: TicketNotification["type"]) {
  switch (type) {
    case "NEW_TICKET":
      return "New Ticket";
    case "STATUS_UPDATE":
      return "Status Update";
    case "MESSAGE":
      return "Message";
    default:
      return "-";
  }
}

export function getTitle(n: TicketNotification) {
  if (n.type === "NEW_TICKET") {
    return n.title ?? `Ticket #${n.ticketId}`;
  }

  return `Ticket #${n.ticketId}`;
}

export function getDescription(n: TicketNotification) {
  switch (n.type) {
    case "NEW_TICKET":
      return "A new ticket was created";

    case "STATUS_UPDATE":
      return `Ticket status changed to "${n.status}"`;

    case "MESSAGE":
      return n.message ?? "-";

    default:
      return "-";
  }
}

export function getCreatedBy(
  n: TicketNotification,
  role: "admin" | "user"
) {
  if (role === "user") return "Admin";

  return n.userId ? `User #${n.userId}` : "System";
}

export function getLink(
  n: TicketNotification,
  role: "admin" | "user"
) {
  const base = role === "admin" ? "/admin" : "/user";

  return (
    <Link
      to={`${base}/tickets/`}
      className="btn btn-link btn-sm"
    >
      View
    </Link>
  );
}
