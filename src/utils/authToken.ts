import { store } from "../store";
import { setCredentials } from "../store/features/auth/authSlice";
import { refreshAccessToken } from "../services/authService";
import type { AuthResponse } from "../types/auth.types";

export const ensureAccessToken = async () => {
  const state = store.getState();

  const { accessToken, user } = state.auth;

  if (accessToken && user) return accessToken;

  try {
    const response = await refreshAccessToken();
    const { accessToken: newAccessToken, data } = response as AuthResponse;

    if (newAccessToken) {
      console.log("updating state====>");
      store.dispatch(setCredentials({ accessToken: newAccessToken, data }));
      return newAccessToken;
    }

    return null;
  } catch {
    return null;
  }
};
