import Body from "../../features/DashBoard/Admin/Body";
import Sidebar from "../../features/DashBoard/Admin/Sidebar";
import { menuItems } from "./constants/menubarItems";
import AdminDashBoardProvider from "./provider/AdminDashBoardProvider";
const Index = () => {
  return (
    <AdminDashBoardProvider>
    <div className="mt-17.5 drawer lg:drawer-open fixed overflow-y-scroll">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <Body />
      <Sidebar menuItems={menuItems} />
       </div>
    </AdminDashBoardProvider>
  );
};

export default Index;
