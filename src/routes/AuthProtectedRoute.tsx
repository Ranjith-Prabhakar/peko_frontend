import { Navigate, Outlet } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";

interface AuthProtectedRouteProps {
  allowedRoles?: string[]; // optional: restrict access
}

const AuthProtectedRoute = ({ allowedRoles }: AuthProtectedRouteProps) => {
  const user = useGetUser();

  if (user === undefined) return <div>Loading...</div>; // waiting for token/user

  if (!user) return <Navigate to="/login" replace />;

  // If allowedRoles are provided, check role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // <-- Render nested routes
};

export default AuthProtectedRoute;
