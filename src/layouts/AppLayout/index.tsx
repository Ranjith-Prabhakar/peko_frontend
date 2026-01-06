import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="h-[calc(100vh-64px)] flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
