import type { MenuItem } from "../types/menu.items";

export const adminMenuItems: MenuItem[] = [
  { id: 1, item: "Reports", path: "/admin/reports" },
  { id: 2, item: "All Tickets", path: "/admin/tickets" },
  { id: 3, item: "Notifications", path: "/admin/notifications" },
  { id: 4, item: "Logout", path: "/logout" },
];
