import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { TicketMessage } from "../../types/ticket";
import { fetchMessages } from "../../services/ticket/fetchMessages";
import { socket } from "../../socket/socket";
import type { RootState } from "../../store";
import {
  setCurrentTicketId,
  setMessages,
  addMessage,
  clearChat,
} from "../../store/features/chat/chatSlice";

interface TicketChatProps {
  ticketId: number;
  currentUserId: number;
  currentUserName: string;
  currentUserRole: "admin" | "user";
  targetUserId?: number;
}

const TicketChat = ({
  ticketId,
  currentUserId,
  currentUserName,
  currentUserRole,
  targetUserId,
}: TicketChatProps) => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  return () => {
    dispatch(clearChat());
  };
}, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentTicketId(ticketId));

    async function loadMessages() {
      try {
        const fetched = await fetchMessages(ticketId);
        dispatch(setMessages(fetched.data || []));
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    }

    loadMessages();
  }, [ticketId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleIncomingMessage = (msg: TicketMessage) => {
      dispatch(addMessage(msg));
    };

    if (currentUserRole === "user") {
      socket?.on("user-message-at-message-box", handleIncomingMessage);
    } else {
      socket?.on("admin-message-at-message-box", handleIncomingMessage);
    }

    return () => {
      socket?.off("user-message-at-message-box", handleIncomingMessage);
      socket?.off("admin-message-at-message-box", handleIncomingMessage);
    };
  }, [dispatch, currentUserRole]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: TicketMessage = {
      ticketId,
      senderId: currentUserId,
      senderName: currentUserName,
      message: input,
      createdAt: new Date().toISOString(),
    };

    dispatch(addMessage(newMessage));
    setInput("");

    let toAddress = "";
    if (currentUserRole === "user") {
      toAddress = "role:admin";
    } else {
      if (!targetUserId) return;
      toAddress = `user:${targetUserId}`;
    }

    socket?.emit("message-to-server-from-client-to-peer", {
      toAddress,
      message: newMessage,
    });
  };

  return (
    <div className="card bg-gray-900 border border-white/10 rounded-lg shadow-xl flex flex-col flex-1 h-full">
      <div className="card-body flex flex-col h-full">
        <h3 className="font-semibold mb-2 text-white text-center text-xl">
          Conversation
        </h3>

        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-gray-800 rounded">
          {messages.length === 0 && (
            <div className="text-center text-sm opacity-50 text-white">
              No messages yet
            </div>
          )}

          {messages.map((msg, idx) => {
            const isOwn = msg.senderId === currentUserId;

            return (
              <div
                key={idx}
                className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble ${
                    isOwn
                      ? "chat-bubble-primary"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {!isOwn && (
                    <div className="text-xs opacity-70 mb-1">
                      {msg.senderName}
                    </div>
                  )}
                  {msg.message}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        <div className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full bg-gray-700 text-white border-white/30"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketChat;
