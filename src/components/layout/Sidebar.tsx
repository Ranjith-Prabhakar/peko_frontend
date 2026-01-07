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
    <ul className="menu min-h-full w-48 p-4 bg-[#162033] text-white shadow-xl">
      <div className="flex justify-center items-center w-full h-12 border-b border-white/10 mb-6 py-8">
        <h3 className="text-3xl font-extrabold">Peko</h3>
      </div>

      {menuItems.map((item) => {
        const isNotificationItem = item.path.endsWith("/notifications");

        return (
          <li key={item.id} className="p-0">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `
                flex w-full items-center justify-between
                px-4 py-3
                rounded-md
                transition-colors
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-gray-700/60"
                }
                `
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
