import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectSocket(accessToken: string) {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_SOCKET_URL!, {
      withCredentials: true,
      auth: {
        token: accessToken,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      socket = null;
    });

    socket.on("message", (msg) => {
      console.log("Received message:", msg);
    });
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}
