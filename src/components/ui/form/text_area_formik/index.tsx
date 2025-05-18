import { HelperText, Label, Textarea, TextareaProps } from "flowbite-react";
import { FormikValues, useFormik } from "formik";

interface IVnTextAreaFormik<T extends FormikValues> extends TextareaProps {
  label?: string;
  id: Extract<keyof T, string>;
  className?: string;
  formik: ReturnType<typeof useFormik<T>>;
}

export function VnTextAreaFormik<T extends FormikValues>({
  label,
  id,
  className,
  formik,
  disabled,
  ...props
}: IVnTextAreaFormik<T>) {
  const hasError = typeof formik?.errors?.[id] === "string";
  const errorText = hasError ? (formik?.errors?.[id] as string) : undefined;
  return (
    <div className={className}>
      {label && (
        <div className="mb-1 block text-gray-800">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}

      <Textarea
        id={id}
        name={id}
        value={formik.values[id] ?? ""}
        onChange={formik.handleChange}
        disabled={formik.isSubmitting || disabled}
        color={hasError ? "failure" : undefined}
        {...props}
        theme={{
          colors: {
            gray: " placeholder-gray-500 focus:border-tertiary focus:ring-tertiary font-prompt font-medium text-gray-600",
          },
        }}
      />

      {errorText && (
        <HelperText>
          <span className="font-medium text-sm text-red-500">{errorText}</span>
        </HelperText>
      )}
    </div>
  );
}
