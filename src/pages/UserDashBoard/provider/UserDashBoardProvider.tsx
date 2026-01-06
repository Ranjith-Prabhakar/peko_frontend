import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import useUserDashBoardHook from "../hook";
import type { Category } from "../../../types/category";

interface UserDashBoardContextType {
  activeMenuId: number | null;
  setActiveMenuId: (id: number) => void;
  categories: Category[];
}

const UserDashBoardContext =
  createContext<UserDashBoardContextType | undefined>(undefined);

export const useUserDashBoardContext = () => {
  const context = useContext(UserDashBoardContext);
  if (!context) {
    throw new Error(
      "useUserDashBoardContext must be used within UserDashBoardProvider"
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

const UserDashBoardProvider = ({ children }: Props) => {
  const { activeMenuId, setActiveMenuId, categories } = useUserDashBoardHook();

  return (
    <UserDashBoardContext.Provider
      value={{
        activeMenuId,
        setActiveMenuId,
        categories,
      }}
    >
      {children}
    </UserDashBoardContext.Provider>
  );
};

export default UserDashBoardProvider;
