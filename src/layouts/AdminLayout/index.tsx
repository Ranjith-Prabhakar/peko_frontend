import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import { adminMenuItems } from "../../config/adminMenuItems";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar menuItems={adminMenuItems} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
