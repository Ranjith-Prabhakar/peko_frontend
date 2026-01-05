export type SubmitButtonProps = {
  name: string;
  loading?: boolean;
  disable?: boolean;
  submitHandler: () => void;
};