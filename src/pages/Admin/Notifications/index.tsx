import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import NotificationTable from "../../../components/ui/Table/NotificationTable";
import { mergeAndSortNotifications } from "../../..//utils/notification.utils";

const AdminNotificationsPage = () => {
  const { newTickets, statusUpdates, messages } = useSelector(
    (state: RootState) => state.notification
  );

  const notifications = mergeAndSortNotifications(
    newTickets,
    statusUpdates,
    messages
  );

  return (
    <NotificationTable
      notifications={notifications}
      role="admin"
    />
  );
};

export default AdminNotificationsPage;
