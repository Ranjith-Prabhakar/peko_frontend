import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "../layouts/AppLayout";
import { Toaster } from "react-hot-toast";
import AuthProtectedRoute from "./AuthProtectedRoute";
import GuestOnlyRoute from "./GuestOnlyRoute";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<AuthProtectedRoute />} />
          </Route>
          <Route
            path="/login"
            element={
              <GuestOnlyRoute>
                <Login />
              </GuestOnlyRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestOnlyRoute>
                <Register />
              </GuestOnlyRoute>
            }
          />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: "#333", color: "#fff" },
          }}
        />
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
