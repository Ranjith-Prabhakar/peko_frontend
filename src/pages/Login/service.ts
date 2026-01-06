import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { store } from "../../store";
import { setCredentials } from "../../store/features/auth/authSlice";
import { connectSocket } from "../../socket/socket";
import type { AxiosError } from "axios";

type LoginPayload = {
  email: string;
  password: string;
};

export async function submitLogin(
  payload: LoginPayload,
  clearFields: () => void,
  navigate: NavigateFunction,
  setLoading: (loading: boolean) => void
): Promise<void> {
  setLoading(true);

  try {
    const res = await axios.post("/auth/login", payload, {
      withCredentials: true,
      requiresAuth: false,
    });

    const { accessToken, user } = res.data.data;

    store.dispatch(
      setCredentials({
        accessToken,
        data: user,
      })
    );

    connectSocket(accessToken); 
    clearFields();
    toast.success("Login successful");
    navigate("/");
  } catch (err) {
    const error = err as AxiosError<any>;

    if (error.response?.status === 401) {
      toast.error("Invalid email or password");
      return;
    }

    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
}
