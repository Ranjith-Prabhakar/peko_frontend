import { store } from "../store";
import { setCredentials } from "../store/features/auth/authSlice";
import { refreshAccessToken } from "../services/auth/authService";
import type { AuthResponse } from "../types/auth.types";
import { connectSocket } from "../socket/socket";

export const ensureAccessToken = async () => {
  const state = store.getState();
  const { accessToken, user } = state.auth;

  if (accessToken && user) {
    connectSocket(user.id);
    return accessToken;
  }

  try {
    const response = await refreshAccessToken();
    const { accessToken: newAccessToken, data } = response as AuthResponse;

    if (newAccessToken && data) {
      store.dispatch(setCredentials({ accessToken: newAccessToken, data }));
      connectSocket(data.id); 
      return newAccessToken;
    }

    return null;
  } catch (err) {
    console.error("Error refreshing access token", err);
    return null;
  }
};
