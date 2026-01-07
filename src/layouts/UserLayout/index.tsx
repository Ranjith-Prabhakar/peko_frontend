import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { userMenuItems } from "../../config/userMenuItems";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={userMenuItems} />
      <main className="flex-1 p-6  bg-[#172540]">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
