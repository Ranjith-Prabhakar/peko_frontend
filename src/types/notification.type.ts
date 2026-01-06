

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