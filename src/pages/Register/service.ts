import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import type { NavigateFunction } from "react-router-dom";

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export async function submitSignup(
  payLoad: SignupPayload,
  clearFields: () => void,
  navigate: NavigateFunction,
  setLoading: (loading: boolean) => void
): Promise<void> {
  try {
    setLoading(true);

    const result = await axios.post("/auth/signup", payLoad);

    setLoading(false);

    if (result.status === 201) {
      clearFields();
      toast.success("User registration successful. Please login now.");
      navigate("/login");
    } else {
      toast.error(
        result.data?.message || "Something went wrong. Please try again."
      );
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    setLoading(false);
  }
}
