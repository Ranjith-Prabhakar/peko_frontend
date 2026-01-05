import { ensureAccessToken } from "../utils/authToken";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export function setupRequestInterceptors(api: AxiosInstance): void {
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (!config.requiresAuth) {
        return config;
      }

      const token = await ensureAccessToken();

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
}



{
  /**
  api.get("/profile", {
  requiresAuth: true
});

api.get("/public/products"); // no auth needed
  */
}
