import React from "react";
import FormInput from "../../components/ui/FormInput";
import SubmitButton from "../../components/ui/SubmitButton";
import { useRegisterForm } from "./hook";

const Index: React.FC = () => {
  const {
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
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-[#162033] rounded-lg shadow-lg p-8">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold text-center text-white">Sign up</h2>
        </div>

        <FormInput
          name="Name"
          type="text"
          placeholder="Your name"
          state={name}
          handler={nameHandler}
          errorHandler={nameErrorHandler}
          isError={nameError}
          errorMessage={nameErrorMsg}
        />
        <FormInput
          name="Email"
          type="email"
          placeholder="you@example.com"
          state={email}
          handler={emailHandler}
          errorHandler={emailErrorHandler}
          isError={emailError}
          errorMessage={emailErrorMsg}
        />
        <FormInput
          name="Password"
          type="password"
          placeholder="Enter password"
          state={password}
          handler={passwordHandler}
          errorHandler={passwordErrorHandler}
          isError={passwordError}
          errorMessage={passwordErrorMsg}
        />
        <FormInput
          name="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          state={confirmPassword}
          handler={confirmPasswordHandler}
          errorHandler={confirmPasswordErrorHandler}
          isError={confirmPasswordError}
          errorMessage={confirmPasswordErrorMsg}
        />

        <SubmitButton
          name="Register"
          loading={loading}
          disable={
            nameError ||
            emailError ||
            passwordError ||
            confirmPasswordError ||
            !name ||
            !email ||
            !password ||
            !confirmPassword
          }
          submitHandler={submitRegistrationFormHandler}
        />

        <h5 className="text-center mt-4 text-sm text-white">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="link link-primary cursor-pointer"
          >
            Login
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Index;
