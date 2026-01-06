

export type NotificationType = "NEW_TICKET" | "STATUS_UPDATE" | "MESSAGE";

export interface TicketNotification {
  type: NotificationType;
  ticketId: number;
  createdAt: string;

  title?: string;
  status?: string;
  message?: string;

  userId?: number;
  createdByName?: string; 
}



export interface NotificationState {
  newTickets: TicketNotification[];
  statusUpdates: TicketNotification[];
  messages: TicketNotification[];
}


// bakend
// notifyAdminsNewTicket({
//   type: "NEW_TICKET",
//   ticketId: ticket.id,
//   title: ticket.title,
//   userId: payload.userId,
//   createdAt: ticket.createdAt,
// });
// notifyUserStatusChange(userId, {
//   type: "STATUS_UPDATE",
//   ticketId,
//   status: "closed",
//   createdAt: new Date().toISOString(),
// });
// notifyUserMessage(userId, {
//   type: "MESSAGE",
//   ticketId,
//   message: "Admin replied",
//   createdAt: new Date().toISOString(),
// });
