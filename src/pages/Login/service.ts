import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import { store } from "../../store";
import { setCredentials } from "../../store/features/auth/authSlice";
import { connectSocket } from "../../socket/socket";

type LoginPayload = {
  email: string;
  password: string;
};

export async function submitLogin(
  payLoad: LoginPayload,
  clearFields: () => void,
  navigate: NavigateFunction,
  setLoading: (loading: boolean) => void
): Promise<void> {
  try {
    setLoading(true);

    const result = await axios.post("/auth/login", payLoad, {
      withCredentials: true,
      requiresAuth: false,
    });

    setLoading(false);

    if (result.status === 200) {
      const { accessToken, user } = result.data.data;
      store.dispatch(
        setCredentials({
          accessToken,
          data: user,
        })
      );
      connectSocket(user.id);
      clearFields();
      toast.success("User login successful.");
      navigate("/");
    } else {
      console.log("Login Error: ----");
      toast.error(result.data.message || "Something went wrong.");
    }
  } catch (error:any) {
    clearFields();
    setLoading(false);
    if(error.status === 401) {
      toast.error("Invalid email or password.");
      return;
    }
    toast.error("Something went wrong.");
  }
}
