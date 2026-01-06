import Body from "../../features/DashBoard/User/Body";
import Sidebar from "../../features/DashBoard/User/Sidebar";
import { menuItems } from "./constants/menubarItems";
import UserDashBoardProvider from "./provider/UserDashBoardProvider";
const Index = () => {
  return (
    <UserDashBoardProvider>
    <div className="mt-17.5 drawer lg:drawer-open fixed overflow-y-scroll">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <Body />
      <Sidebar menuItems={menuItems} />
       </div>
    </UserDashBoardProvider>
  );
};

export default Index;
