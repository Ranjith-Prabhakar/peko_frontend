import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { connectSocket, getSocket } from "../../socket/socket";
import type { TicketMessage } from "../../types/ticket";

interface TicketChatProps {
  ticketId: number;
  role: "admin" | "user";
}

const TicketChat = ({ ticketId, role }: TicketChatProps) => {
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [input, setInput] = useState("");

  const { user, accessToken } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!accessToken) return;

    // Ensure socket is connected
    connectSocket(accessToken);
    const socket = getSocket();

    const handleMessage = (msg: TicketMessage & { ticketId: number }) => {
      if (msg.ticketId === ticketId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("admin-message", handleMessage);
    socket.on("user-message", handleMessage);

    return () => {
      socket.off("admin-message", handleMessage);
      socket.off("user-message", handleMessage);
    };
  }, [ticketId, accessToken]);

  const sendMessage = () => {
    if (!input.trim() || !user) return;

    const payload: TicketMessage = {
      ticketId,
      message: input,
      senderId: user.id,
      senderName: user.name,
      createdAt: new Date().toISOString(),
    };

    const socket = getSocket();

    socket.emit(
      role === "admin" ? "admin-send-message" : "user-send-message",
      payload
    );

    setMessages((prev) => [...prev, payload]);
    setInput("");
  };

  return (
    <div className="card bg-base-100 shadow-xl flex flex-col">
      <div className="card-body flex flex-col h-full">
        <h3 className="font-semibold mb-2">Conversation</h3>

        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-base-200 rounded">
          {messages.map((msg, idx) => {
            const isOwn = msg.senderId === user?.id;

            return (
              <div
                key={idx}
                className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble ${
                    isOwn ? "chat-bubble-primary" : ""
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
        </div>

        <div className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
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
