import { useEffect, useState, useRef } from "react";
import type { TicketMessage } from "../../types/ticket";
import { fetchMessages } from "../../services/ticket/fetchMessages";
import { socket } from "../../socket/socket";

interface TicketChatProps {
  ticketId: number;
  currentUserId: number;
  currentUserName: string;
  currentUserRole: "admin" | "user";
  targetUserId?: number; // needed when admin replies
}

const TicketChat = ({
  ticketId,
  currentUserId,
  currentUserName,
  currentUserRole,
  targetUserId
}: TicketChatProps) => {
  console.log(  ticketId,
  currentUserId,
  currentUserName,
  currentUserRole,targetUserId)
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // fetch messages for the first time
  useEffect(() => {
    async function getMessages() {
      try {
        const fetched = await fetchMessages(ticketId);
        setMessages(fetched.data || []);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    }
    getMessages();
  }, [ticketId]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen to incoming messages
  useEffect(() => {
    const handleUserMessage = (msg: TicketMessage) => {
      if (msg.ticketId === ticketId) setMessages((prev) => [...prev, msg]);
    };

    const handleAdminMessage = (msg: TicketMessage) => {
   
      if (msg.ticketId === ticketId) setMessages((prev) => [...prev, msg]);
    };

    if(currentUserRole === "user"){
      socket?.on("user-message-at-message-box", (msg)=>{
            console.log("msg user------------->",msg)
            setMessages((prev) => [...prev, msg])
      });
    }else{
       socket?.on("admin-message-at-message-box", (msg)=>{
           console.log("msg admin------------->",msg)
           if(msg.ticketId === ticketId){
             setMessages((prev) => [...prev, msg])
           }
           
       });
      

    }
    return () => {
      socket?.off("user-message-at-message-box", handleUserMessage);
      socket?.off("admin-message-at-message-box", handleAdminMessage);
    };
  }, [ticketId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    console.log("insdi sendmsg")
    const newMessage: TicketMessage = {
      ticketId,
      senderId: currentUserId,
      senderName: currentUserName,
      message: input,
      createdAt: new Date().toISOString(),
    };

   
    setMessages((prev) => [...prev, newMessage]);
    setInput("");


    let toAddress = "";
    if (currentUserRole === "user") {
      toAddress = "role:admin";
    } else {
      if (!targetUserId) return;
      toAddress = `user:${targetUserId}`;
    }

    console.log("reached emit")
    socket?.emit("message-to-server-from-client-to-peer", {
      toAddress,
      message: newMessage,
    });
  };

  return (
    <div className="card bg-gray-900 border border-white/10 rounded-lg shadow-xl flex flex-col h-full">
      <div className="card-body flex flex-col h-full">
        <h3 className="font-semibold mb-2 text-white text-center text-xl">Conversation</h3>

        {/* Messages */}
        <div className="flex-1 overflow-y-scroll space-y-3 p-3 bg-gray-800 rounded max-h-[68vh]">
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
                    isOwn ? "chat-bubble-primary" : "bg-gray-700 text-white"
                  }`}
                >
                  {!isOwn && (
                    <div className="text-xs opacity-70 mb-1 text-white">
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

        {/* Input */}
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
