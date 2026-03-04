import { memo } from "react";
import type { UseFormRegister, RegisterOptions, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  errorMessage?: string;
}

const InputField = <T extends FieldValues>({
  name,
  type,
  label,
  placeholder,
  register,
  validation,
  errorMessage,
}: InputFieldProps<T>) => {
  const inputId = `input-${name}`;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        {...register(name, validation)}
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
        aria-invalid={errorMessage ? "true" : "false"}
        aria-describedby={errorMessage ? `${inputId}-error` : undefined}
      />
      {errorMessage && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default memo(InputField) as typeof InputField;