import FormInput from "../../components/ui/FormInput";
import SubmitButton from "../../components/ui/SubmitButton";
import { useRegisterForm } from "./hook";

const Index = () => {
  const {
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
  } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-[#162033] rounded-lg shadow-lg p-8">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        </div>

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

        <SubmitButton
          name="Login"
          loading={loading}
          disable={emailError || passwordError || !email || !password}
          submitHandler={submitLoginFormHandler}
        />

        <h5 className="text-center mt-4 text-sm text-white">
          Not registered yet?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="link link-primary cursor-pointer"
          >
            Create an account
          </span>
        </h5>
      </div>
    </div>
  );
};

export default Index;
