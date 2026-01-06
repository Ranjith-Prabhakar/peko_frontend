// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store";
// import { connectSocket, getSocket } from "../../socket/socket";
// import type { TicketMessage } from "../../types/ticket";

// interface TicketChatProps {
//   ticketId: number;
//   role: "admin" | "user";
// }

// const TicketChat = ({ ticketId, role }: TicketChatProps) => {
//   const [messages, setMessages] = useState<TicketMessage[]>([]);
//   const [input, setInput] = useState("");

//   const { user, accessToken } = useSelector(
//     (state: RootState) => state.auth
//   );

//   useEffect(() => {
//     if (!accessToken) return;

//     connectSocket(accessToken);
//     const socket = getSocket();

//     const handleMessage = (msg: TicketMessage & { ticketId: number }) => {
//       if (msg.ticketId === ticketId) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     };

//     socket.on("admin-message", handleMessage);
//     socket.on("user-message", handleMessage);

//     return () => {
//       socket.off("admin-message", handleMessage);
//       socket.off("user-message", handleMessage);
//     };
//   }, [ticketId, accessToken]);

//   const sendMessage = () => {
//     if (!input.trim() || !user) return;

//     const payload: TicketMessage = {
//       ticketId,
//       message: input,
//       senderId: user.id,
//       senderName: user.name,
//       createdAt: new Date().toISOString(),
//     };

//     const socket = getSocket();

//     socket.emit(
//       role === "admin" ? "admin-send-message" : "user-send-message",
//       payload
//     );

//     setMessages((prev) => [...prev, payload]);
//     setInput("");
//   };

//   return (
//     <div className="card bg-base-100 shadow-xl flex flex-col">
//       <div className="card-body flex flex-col h-full">
//         <h3 className="font-semibold mb-2">Conversation</h3>

//         <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-base-200 rounded">
//           {messages.map((msg, idx) => {
//             const isOwn = msg.senderId === user?.id;

//             return (
//               <div
//                 key={idx}
//                 className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
//               >
//                 <div
//                   className={`chat-bubble ${
//                     isOwn ? "chat-bubble-primary" : ""
//                   }`}
//                 >
//                   {!isOwn && (
//                     <div className="text-xs opacity-70 mb-1">
//                       {msg.senderName}
//                     </div>
//                   )}
//                   {msg.message}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-3 flex gap-2">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="input input-bordered w-full"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button className="btn btn-primary" onClick={sendMessage}>
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketChat;

import { useEffect, useState } from "react";
import type { TicketMessage } from "../../types/ticket";
import { fetchMessages } from "../../services/ticket/fetchMessages";
import { socket } from "../../socket/socket";
import useGetUser from "../../hooks/useGetUser";

interface TicketChatProps {
  ticketId: number;
  currentUserId: number;
  currentUserName: string;
}

const TicketChat = ({
  ticketId,
  currentUserId,
  currentUserName,
}: TicketChatProps) => {
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [input, setInput] = useState("");

  const user = useGetUser();

  const toAddress = user?.role === "user" ? "role:admin" : `user:${user?.id}`;

  useEffect(() => {
    async function getMessages() {
      try {
        const fetchedMessages = await fetchMessages(ticketId);
        console.log("Fetched messages:", fetchedMessages);
           setMessages(fetchedMessages.data || []); 
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    }

    getMessages();
  }, [ticketId]);

  useEffect(() => {
    const handleIncomingMessage = (message: TicketMessage) => {
      console.log("Received message via socket:", message);
      setMessages((prev) => [...prev, message]);
    };

    socket?.on("user-message-at-message-box", handleIncomingMessage);

    return () => {
      socket?.off("user-message-at-message-box", handleIncomingMessage);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: TicketMessage = {
      ticketId,
      message: input,
      senderId: currentUserId,
      senderName: currentUserName,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    socket?.emit("message-to-server-from-client-to-peer", {
      toAddress,
      message: newMessage,
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl flex flex-col h-full">
      <div className="card-body flex flex-col h-full">
        <h3 className="font-semibold mb-2">Conversation</h3>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-base-200 rounded">
          {messages.length === 0 && (
            <div className="text-center text-sm opacity-60">
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

        {/* Input */}
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
