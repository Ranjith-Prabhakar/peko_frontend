import { io, type Socket } from "socket.io-client";


let socket: Socket | null = null;

export function connectSocket(id?: string) {
  // console.log("inside socket userId", userId);
  if (!socket) {
    socket = io(import.meta.env.VITE_API_BASE_URL_SOCKET!, {
      withCredentials: true,
      auth: { id },
    });

    socket.on("connect", () => {
      // console.log("Connected to socket server:", socket?.id);
    });

    socket.on("disconnect", () => {
      // console.log("Socket disconnected");
      socket = null; // reset socket on disconnect
    });

    socket.on("message", () => {
      // console.log("Received message from server:", msg);
    });

    socket.on("seatUpdated", (data) => {
      // setLocalStorageElement("current-event", data.event);
      // store.dispatch(setEvent(data.event));
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
