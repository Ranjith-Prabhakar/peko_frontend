import type { SubmitButtonProps } from "./types";

const SubmitButton = ({
  name,
  loading,
  disable,
  submitHandler,
}: SubmitButtonProps) => {
  return (
    <div
      className={`form-control mt-6 bg-primary ${
        disable ? "cursor-not-allowed" : ""
      }`}
    >
      <button
        className="btn w-full btn-primary border-none text-white"
        disabled={disable}
        onClick={() => {
          if (!disable) submitHandler();
        }}
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          name
        )}
      </button>
    </div>
  );
};

export default SubmitButton;
