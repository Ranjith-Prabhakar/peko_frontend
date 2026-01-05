export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  data: User;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
}
