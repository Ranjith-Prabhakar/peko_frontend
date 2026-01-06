import CreateTicket from "./CreateTicket";
import { useUserDashBoardContext } from "../../../pages/UserDashBoard/provider/UserDashBoardProvider";

const Body = () => {
  const { activeMenuId } = useUserDashBoardContext();

  return (
    <div className="drawer-content flex flex-col items-center justify-center">
      {activeMenuId === 2 && (
        <CreateTicket/>
      )}

      {!activeMenuId && (
        <div className="text-gray-500">
          Please select a menu item
        </div>
      )}
    </div>
  );
};

export default Body;
