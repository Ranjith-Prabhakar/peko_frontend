import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

interface Props {
  allowedRoles?: Array<"admin" | "user">;
}

const AuthProtectedRoute = ({ allowedRoles }: Props) => {
  const user = useGetUser();

  if (user === undefined) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthProtectedRoute;
