import { Navigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import { lazy } from "react";

const AdminDashBoard = lazy(() => import("../pages/AdminDashBoard"));
const UserDashBoard = lazy(() => import("../pages/UserDashBoard"));

const AuthProtectedRoute = () => {
  const user = useGetUser();

  if (user === undefined) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin" ? <AdminDashBoard /> : <UserDashBoard />;
};

export default AuthProtectedRoute;
