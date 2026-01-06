import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";
import type { AxiosError } from "axios";

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export async function submitSignup(
  payload: SignupPayload,
  clearFields: () => void,
  navigate: NavigateFunction,
  setLoading: (loading: boolean) => void
): Promise<void> {
  setLoading(true);

  try {
    await axios.post("/auth/signup", payload);

    clearFields();
    toast.success("Registration successful. Please login.");
    navigate("/login");
  } catch (err) {
    const error = err as AxiosError<any>;

    toast.error(
      error.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
}
