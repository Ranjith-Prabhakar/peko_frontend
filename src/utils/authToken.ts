import { store } from "../store";
import { setCredentials } from "../store/features/auth/authSlice";
import { refreshAccessToken } from "../services/authService";

export const ensureAccessToken = async () => {
  const state = store.getState();

  const accessToken = state.auth.accessToken;
  const user = state.auth.user;

  if (accessToken && user) return accessToken;

  try {
    const response = await refreshAccessToken();

    const { accessToken: newToken, user: refreshedUser } = response;

    if (newToken) {
      store.dispatch(
  setCredentials({ accessToken: newToken, data: refreshedUser })
);
      return newToken;
    }

    return null;
  } catch (error) {
    return null;
  }
};
