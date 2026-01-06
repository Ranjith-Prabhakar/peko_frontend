import type { TicketNotification } from "../../../../types/notification.type";
import {
  getTypeLabel,
  getCreatedBy,
  getTitle,
  getDescription,
  getLink,
} from "./helpers";

interface NotificationTableProps {
  notifications: TicketNotification[];
  role: "admin" | "user";
}

const NotificationTable = ({ notifications, role }: NotificationTableProps) => {
  if (!notifications.length) {
    return <div className="p-4 text-gray-500">No notifications</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Created By</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((n, index) => (
            <tr key={`${n.type}-${n.ticketId}-${index}`}>
              <td>
                <span className="badge badge-outline">
                  {getTypeLabel(n.type)}
                </span>
              </td>

              <td>{getCreatedBy(n, role)}</td>

              <td className="font-medium">{getTitle(n)}</td>

              <td className="max-w-md truncate">
                {getDescription(n)}
              </td>

              <td className="text-sm text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </td>

              <td>{getLink(n, role)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
