import { useState } from "react";
import { submitLogin } from "./service";
import { useNavigate, type NavigateFunction } from "react-router-dom";

export function useRegisterForm() {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMessage] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();

  function emailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(false);
      setEmailErrorMessage("");
    }
  }

  function emailErrorHandler() {
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address");
    }
  }

  function passwordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
  }

  function passwordErrorHandler() {
    if (!password) return;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
    }
  }

  function clearFields() {
    setEmail("");
    setPassword("");
  }

  async function submitLoginFormHandler() {
    try {
      const payLoad = { email, password };

      await submitLogin(payLoad, clearFields, navigate, setLoading);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    email,
    emailError,
    emailErrorMsg,
    emailHandler,
    emailErrorHandler,
    password,
    passwordError,
    passwordErrorMsg,
    passwordHandler,
    passwordErrorHandler,
    submitLoginFormHandler,
    navigate,
    loading,
  };
}
