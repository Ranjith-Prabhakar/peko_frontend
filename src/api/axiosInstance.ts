import axios, { type AxiosInstance } from "axios";
import { setupResponseInterceptors } from "./responseInterceptor";
import { setupRequestInterceptors } from "./requestInterceptor";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true,
});

setupRequestInterceptors(api);
setupResponseInterceptors(api);

export default api;
