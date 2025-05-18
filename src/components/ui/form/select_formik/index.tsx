import { HelperText, Label, Select, SelectProps } from "flowbite-react";
import { FormikValues, useFormik } from "formik";

interface IVnSelectFormikProps<T extends FormikValues> extends SelectProps {
  label?: string;
  id: Extract<keyof T, string>;
  className?: string;
  formik: ReturnType<typeof useFormik<T>>;
  options: {
    label: string;
    value: string;
  }[];
}
export function VnSelectFormik<T extends FormikValues>({
  id,
  label,
  className,
  formik,
  disabled,
  ...props
}: IVnSelectFormikProps<T>) {
  const hasError = typeof formik?.errors?.[id] === "string";
  const errorText = hasError ? (formik?.errors?.[id] as string) : undefined;

  return (
    <div className={className}>
      {label && (
        <div className="mb-1 block text-gray-800">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}

      <Select
        id={id}
        name={id}
        value={formik.values[id] ?? ""}
        onChange={formik.handleChange}
        color={hasError ? "failure" : undefined}
        disabled={formik.isSubmitting || disabled}
        {...props}
        theme={{
          field: {
            select: {
              colors: {
                gray: "placeholder-gray-500 focus:border-tertiary focus:ring-tertiary font-prompt font-medium text-gray-600",
              },
            },
          },
        }}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {errorText && (
        <HelperText>
          <span className="font-medium text-sm text-red-500">{errorText}</span>
        </HelperText>
      )}
    </div>
  );
}
