import { useAdminDashBoardContext } from "../../../pages/AdminDashBoard/provider/AdminDashBoardProvider";

const Body = () => {
  const { activeMenuId } = useAdminDashBoardContext();

  return (
    <div className="drawer-content flex flex-col items-center justify-center">
      {/* {activeMenuId === 2 && (
        <CreateTicket/>
      )} */}

      {!activeMenuId && (
        <div className="text-gray-500">
          Please select a menu item
        </div>
      )}
    </div>
  );
};

export default Body;
