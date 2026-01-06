import { NavLink } from "react-router-dom";
import type { MenuItem } from "../../types/menu.items";

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar = ({ menuItems }: SidebarProps) => {
  return (
    <ul className="menu bg-base-200 min-h-full w-48 p-4">
      {menuItems.map(item => (
        <li key={item.id}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `transition-colors ${
                isActive ? "bg-primary text-white" : ""
              }`
            }
          >
            {item.item}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
