import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../../types/auth.types";

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

type SetCredentialsPayload = {
  accessToken: string;
  data: User;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<SetCredentialsPayload>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.data;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
