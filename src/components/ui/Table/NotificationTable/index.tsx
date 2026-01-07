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
    return (
      <div className="p-4 text-white/60 bg-gray-900 border border-white/10 rounded-md">
        No notifications
      </div>
    );
  }

  return (
    <div className="overflow-x-auto min-h-[80vh] p-4">
      <table className="table table-sm border border-white/10 bg-gray-900 w-full">
        <thead className="text-white border-b border-white/20">
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
            <tr
              key={`${n.type}-${n.ticketId}-${index}`}
              className="
                cursor-pointer
                border-b border-white/10
                transition-all duration-200
                hover:bg-indigo-500/10
                hover:border-indigo-400/40
                last:border-b-0
              "
            >
              <td>
                <span className="badge badge-outline text-white border-white/30">
                  {getTypeLabel(n.type)}
                </span>
              </td>

              <td className="opacity-80">
                {getCreatedBy(n, role)}
              </td>

              <td className="font-medium text-white">
                {getTitle(n)}
              </td>

              <td className="truncate max-w-md opacity-80">
                {getDescription(n)}
              </td>

              <td className="text-sm opacity-70">
                {new Date(n.createdAt).toLocaleString()}
              </td>

              <td className="opacity-90">
                {getLink(n, role)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;
