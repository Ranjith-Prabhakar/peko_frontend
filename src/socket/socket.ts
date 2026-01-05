import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectSocket(id?: string) {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_SOCKET_URL!, {
      withCredentials: true,
      auth: { id },
    });

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      socket = null;
    });

    socket.on("welcome", (msg) => {
      console.log("Server says:", msg);
    });

    socket.on("your-id", (id) => {
      console.log("My socket ID:", id);
    });

    socket.on("user-disconnected", (id) => {
      console.log("User disconnected:", id);
    });

    socket.on("message", (msg) => {
      console.log("Received message:", msg);
    });
  }

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}
