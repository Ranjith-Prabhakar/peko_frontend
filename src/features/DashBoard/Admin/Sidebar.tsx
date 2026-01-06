import type { MenuItem } from "../../../types/menu.items";
import { useAdminDashBoardContext } from "../../../pages/AdminDashBoard/provider/AdminDashBoardProvider";


interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar = ({ menuItems }: SidebarProps) => {
  const { activeMenuId, setActiveMenuId } = useAdminDashBoardContext();

  return (
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <ul className="menu bg-base-200 min-h-full w-40 p-4">
          {menuItems.map((item) => {
            const isActive = activeMenuId === item.id;

            return (
              <li key={item.id}>
                <a
                  onClick={() => setActiveMenuId(item.id)}
                  className={`cursor-pointer transition-colors
                    ${isActive ? "bg-primary text-white" : ""}
                  `}
                >
                  {item.item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
   
  );
};

export default Sidebar;
