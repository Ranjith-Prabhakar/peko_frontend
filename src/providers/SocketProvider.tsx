import { useEffect } from "react";
import { useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "../socket/socket";
import type { RootState } from "../store";

export default function SocketProvider() {
  const accessToken = useSelector(
    (state: RootState) => state.auth.accessToken
  );

  useEffect(() => {
    if (accessToken) {
      connectSocket(accessToken);
    }

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  return null;
}
