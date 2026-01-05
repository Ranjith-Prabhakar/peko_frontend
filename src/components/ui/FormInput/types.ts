export type FormInputProps = {
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  isError?: boolean;
  state: string | number;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
