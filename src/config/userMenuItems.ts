import type { MenuItem } from "../types/menu.items";

export const userMenuItems: MenuItem[] = [
  { id: 1, item: "My Tickets", path: "/user/tickets" },
  { id: 2, item: "Create Ticket", path: "/user/create-ticket" },
  { id: 3, item: "Notifications", path: "/user/notifications" },
  { id: 4, item: "Logout", path: "/logout" },
];
