import type { TicketMessage } from "./ticket";

export interface ChatState {
  currentTicketId: number | null;
  messages: TicketMessage[];
}
