import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "../store";
import { setCredentials } from "../store/features/auth/authSlice";
import type { AuthResponse } from "../types/auth.types";

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });
  failedQueue = [];
};

export const setupResponseInterceptors = (apiInstance: AxiosInstance): void => {
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.set("Authorization", `Bearer ${token}`);
              return apiInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const res = await apiInstance.post<AuthResponse>("/auth/refresh");

          const { accessToken, data: user } = res.data;

          store.dispatch(
            setCredentials({
              accessToken,
              data: user,
            })
          );

          apiInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          processQueue(null, accessToken);

          originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);

          return apiInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
