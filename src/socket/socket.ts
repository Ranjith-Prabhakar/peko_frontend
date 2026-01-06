import { io, type Socket } from "socket.io-client";
import notificationSound from "../assets/notification.mp3";

const sound = new Audio(notificationSound);

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
      console.log("Socket connected:", socket!.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      socket = null;
    });

    socket.on("admin-notification", (payload) => {
      sound.play()
      console.log("Admin notification:", payload);
    });

    socket.on("notification", (payload) => {
      sound.play()
      console.log("User notification:", payload);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
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
