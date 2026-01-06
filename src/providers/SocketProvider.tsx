import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { connectSocket, disconnectSocket } from "../socket/socket";

export default function SocketProvider() {
  const accessToken = useSelector(
    (state: RootState) => state.auth.accessToken
  );

  useEffect(() => {
    if (!accessToken) {
      disconnectSocket();
      return;
    }
    connectSocket(accessToken);

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  return null;
}
