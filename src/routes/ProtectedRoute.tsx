import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

const ProtectedRoute = () => {
  const user = useGetUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
