import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import AuthProtectedRoute from "./AuthProtectedRoute";
import GuestOnlyRoute from "./GuestOnlyRoute";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import useGetUser from "../hooks/useGetUser";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const AdminReports = lazy(() => import("../pages/Admin/Reports"));
const AdminTickets = lazy(() => import("../pages/Admin/Tickets"));
const AdminTicketDetails = lazy(() => import("../pages/Admin/TicketDetails"));
const AdminNotifications = lazy(() => import("../pages/Admin/Notifications"));

const UserTickets = lazy(() => import("../pages/User/Tickets"));
const CreateTicket = lazy(() => import("../pages/User/CreateTicket"));
const UserNotifications = lazy(() => import("../pages/User/Notifications"));

const AppRouter = () => {
  return (
    <BrowserRouter>

      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: { background: "#333", color: "#fff" }
      }} />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path="/login" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
          <Route path="/signup" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />

          <Route
            path="/"
            element={<AuthRedirect />}
          />

          <Route element={<AuthProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminReports />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="tickets/:id" element={<AdminTicketDetails />} />
              <Route path="notifications" element={<AdminNotifications />} />
            </Route>
          </Route>

          <Route element={<AuthProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserTickets />} />
              <Route path="tickets" element={<UserTickets />} />
              <Route path="create-ticket" element={<CreateTicket />} />
              <Route path="notifications" element={<UserNotifications />} />
            </Route>
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const AuthRedirect = () => {
  const user = useGetUser();

  if (user === undefined) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin"
    ? <Navigate to="/admin" replace />
    : <Navigate to="/user" replace />;
};

export default AppRouter;
