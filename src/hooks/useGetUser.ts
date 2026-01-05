import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { User } from "../types/auth.types";

function useGetUser(): User | null {
  const user = useSelector((state: RootState) => state.auth.user);
  return user;
}

export default useGetUser;
