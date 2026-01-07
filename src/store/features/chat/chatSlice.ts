import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatState } from "../../../types/chat.types";
import type { TicketMessage } from "../../../types/ticket";

const initialState: ChatState = {
  currentTicketId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentTicketId(state, action: PayloadAction<number | null>) {
      state.currentTicketId = action.payload;
    },

    setMessages(state, action: PayloadAction<TicketMessage[]>) {
      state.messages = action.payload;
    },

    addMessage(state, action: PayloadAction<TicketMessage>) {
      const msg = action.payload;

      const exists = state.messages.some(
        (m) =>
          m.senderId === msg.senderId &&
          m.message === msg.message &&
          m.createdAt === msg.createdAt
      );

      if (!exists) {
        state.messages.push(msg);
      }
    },

    clearChat(state) {
      state.currentTicketId = null;
      state.messages = [];
    },
  },
});

export const {
  setCurrentTicketId,
  setMessages,
  addMessage,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
