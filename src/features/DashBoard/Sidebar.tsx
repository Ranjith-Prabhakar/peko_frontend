import type { MenuItem } from "../../types/menu.items";

interface SidebarProps {
  menuItems: MenuItem[];
}
const Sidebar = ({ menuItems }: SidebarProps) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <ul className="menu bg-base-200 min-h-full w-40 p-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a>{item.item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
