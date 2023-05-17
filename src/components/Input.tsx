import clsx from "clsx";
import { ChangeEvent, FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

export const Input: FC<InputProps> = ({
  label,
  value,
  className,
  onChange,
  error = false,
  errorMessage,
}) => {
  return (
    <label
      className={clsx(
        "block text-sm text-gray-700 dark:text-gray-400",
        className,
        {
          error: error,
        }
      )}
    >
      {label && <span>{label}</span>}
      <input
        className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-blue-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700"
        value={value}
        onChange={onChange}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1">{errorMessage}</span>
      )}
    </label>
  );
};
