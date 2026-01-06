import type { TicketNotification } from "../types/notification.type";

export function mergeAndSortNotifications(
  newTickets: TicketNotification[],
  statusUpdates: TicketNotification[],
  messages: TicketNotification[]
): TicketNotification[] {
  return [...newTickets, ...statusUpdates, ...messages].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}
