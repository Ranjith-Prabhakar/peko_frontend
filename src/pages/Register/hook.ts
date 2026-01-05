import { useState } from "react";
import { submitSignup, type SignupPayload } from "./service";
import { type NavigateFunction, useNavigate } from "react-router-dom";

export function useRegisterForm() {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [nameErrorMsg, setNameErrorMessage] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMessage] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMsg, setPasswordErrorMessage] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMessage] =
    useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  function nameHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if (nameError) {
      setNameError(false);
      setNameErrorMessage("");
    }
  }

  function nameErrorHandler() {
    if (!name) return;
    if (name.trim().length < 3) {
      setNameError(true);
      setNameErrorMessage("Name must be at least 3 characters long");
    }
  }

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

  function confirmPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }
  }

  function confirmPasswordErrorHandler() {
    if (!confirmPassword) return;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(confirmPassword)) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage(
        "Confirm password must meet the password requirements"
      );
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match");
    }
  }

  function clearFields() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function submitRegistrationFormHandler() {
    const payload: SignupPayload = { name, email, password };
    await submitSignup(payload, clearFields, navigate, setLoading);
  }

  return {
    name,
    nameError,
    nameErrorMsg,
    nameHandler,
    nameErrorHandler,
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
    confirmPassword,
    confirmPasswordError,
    confirmPasswordErrorMsg,
    confirmPasswordHandler,
    confirmPasswordErrorHandler,
    submitRegistrationFormHandler,
    navigate,
    loading,
  };
}
