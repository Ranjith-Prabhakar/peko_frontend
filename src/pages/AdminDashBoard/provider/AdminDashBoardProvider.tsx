import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import useAdminDashBoardHook from "../hook";

interface AdminDashBoardContextType {
  activeMenuId: number | null;
  setActiveMenuId: (id: number) => void;

}

const AdminDashBoardContext =
  createContext<AdminDashBoardContextType | undefined>(undefined);

export const useAdminDashBoardContext = () => {
  const context = useContext(AdminDashBoardContext);
  if (!context) {
    throw new Error(
      "useAdminDashBoardContext must be used within AdminDashBoardProvider"
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

const AdminDashBoardProvider = ({ children }: Props) => {
  const { activeMenuId, setActiveMenuId } = useAdminDashBoardHook();

  return (
    <AdminDashBoardContext.Provider
      value={{
        activeMenuId,
        setActiveMenuId,
      }}
    >
      {children}
    </AdminDashBoardContext.Provider>
  );
};

export default AdminDashBoardProvider;
