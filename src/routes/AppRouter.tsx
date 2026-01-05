import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  Suspense } from "react";
import AppLayout from "../layouts/AppLayout";
import { Toaster } from "react-hot-toast";




const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AppLayout />}>
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
