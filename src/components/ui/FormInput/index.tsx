import type { FormInputProps } from "./types";

const FormInput = ({
  name,
  type,
  placeholder,
  className = "",
  errorMessage,
  isError,
  state,
  handler,
  errorHandler,
}: FormInputProps) => {
  return (
    <fieldset className="fieldset ">
      <legend className="fieldset-legend text-white">{name}</legend>

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 rounded bg-gray-700  outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        required
        value={state}
        onChange={handler}
        onBlur={errorHandler}
      />

      {isError && (
        <p className="label text-red-500 max-w-full wrap-break-word whitespace-normal mt-1">
          {errorMessage}
        </p>
      )}
    </fieldset>
  );
};

export default FormInput;
