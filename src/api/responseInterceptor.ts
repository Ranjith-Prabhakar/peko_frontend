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

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  requiresAuth?: boolean;
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

export const setupResponseInterceptors = (
  apiInstance: AxiosInstance
): void => {
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryRequestConfig | undefined;

      if (!error.response || !originalRequest) {
        return Promise.reject(error);
      }

      const status = error.response.status;
      const url = originalRequest.url ?? "";

      if (
        status !== 401 ||
        !originalRequest.requiresAuth ||
        originalRequest._retry ||
        url.includes("/auth/login") ||
        url.includes("/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await apiInstance.post<AuthResponse>(
          "/auth/refresh",
          null,
          { requiresAuth: false }
        );

        const { accessToken, data: user } = res.data;

        store.dispatch(
          setCredentials({
            accessToken,
            data: user,
          })
        );

        apiInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return apiInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};
