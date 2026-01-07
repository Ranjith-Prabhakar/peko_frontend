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

  const { user } = useSelector((state: RootState) => state.auth);

  const totalNotifications =
    newTickets.length + statusUpdates.length + messages.length;

  return (
    <div className="flex flex-col justify-between min-h-screen w-56 bg-[#162033] text-white shadow-xl">
      <div className="flex justify-center items-center w-full h-20 border-b border-white/10">
        <h3 className="text-3xl font-extrabold">Peko</h3>
      </div>

      <ul className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isNotificationItem = item.path.endsWith("/notifications");

          return (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `
                  block w-full px-4 py-3 rounded-md transition-colors
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

      <div className="p-4 border-t border-white/10">
        <p className="w-full text-center font-extrabold">
          {user?.name
            ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
            : "Guest"}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
