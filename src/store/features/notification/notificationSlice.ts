import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NotificationState, TicketNotification } from "../../../types/notification.type";

const MAX_TICKETS = 12;

const initialState: NotificationState = {
  newTickets: [],
  statusUpdates: [],
  messages: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNewTicket: (state, action: PayloadAction<TicketNotification>) => {
      state.newTickets.push(action.payload);

      if (state.newTickets.length > MAX_TICKETS) {
        state.newTickets.shift();
      }
    },
    addStatusUpdate: (state, action: PayloadAction<TicketNotification>) => {
      state.statusUpdates.push(action.payload);
       if (state.statusUpdates.length > MAX_TICKETS) {
        state.statusUpdates.shift();
      }
    },
    addNewMessage: (state, action: PayloadAction<TicketNotification>) => {
      state.messages.push(action.payload);
       if (state.messages.length > MAX_TICKETS) {
        state.messages.shift();
      }
    },
    clearNotifications: (state) => {
      state.newTickets = [];
      state.statusUpdates = [];
      state.messages = [];
    },
  },
});

export const { addNewTicket, addStatusUpdate, addNewMessage, clearNotifications } =
  notificationSlice.actions;
export default notificationSlice.reducer;
