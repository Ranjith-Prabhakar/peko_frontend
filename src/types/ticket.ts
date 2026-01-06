export  interface TicketFormValues {
  title: string;
  description: string;
  categoryId: number | "";
  priority: "low" | "medium" | "high";
}

export interface TicketMessage {
  ticketId: number;
  message: string;
  senderId: number; 
  senderName: string; 
  createdAt: string;  
}
