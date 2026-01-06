import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { MenuItem } from "../../types/menu.items";

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar = ({ menuItems }: SidebarProps) => {
  const { newTickets, statusUpdates, messages } = useSelector(
    (state: RootState) => state.notification
  );

  const totalNotifications =
    newTickets.length + statusUpdates.length + messages.length;

  return (
    <ul className="menu bg-base-200 min-h-full w-48 p-4">
      {menuItems.map((item) => {
        const isNotificationItem = item.path === "/admin/notifications";

        return (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex justify-between items-center transition-colors ${
                  isActive ? "bg-primary text-white" : ""
                }`
              }
            >
              <span>{item.item}</span>

              {isNotificationItem && totalNotifications > 0 && (
                <span className="badge badge-error badge-sm ml-2">
                  {totalNotifications}
                </span>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
