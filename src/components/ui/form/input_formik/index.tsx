"use client";

import { HelperText, Label, TextInput, TextInputProps } from "flowbite-react";
import { FormikValues, useFormik } from "formik";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

export interface IVnInputFormik<T extends FormikValues>
  extends Omit<TextInputProps, "id"> {
  label?: string;
  id: Extract<keyof T, string>;
  className?: string;
  formik: ReturnType<typeof useFormik<T>>;
}

export const VnInputFormik = function <T extends FormikValues>({
  label,
  id,
  type,
  className,
  rightIcon,
  formik,
  ...props
}: IVnInputFormik<T>) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const renderRightIcon = () => {
    if (type !== "password") return null;

    return isVisible ? (
      <LuEye className="cursor-pointer" onClick={toggleVisibility} />
    ) : (
      <LuEyeOff className="cursor-pointer" onClick={toggleVisibility} />
    );
  };

  const hasError = typeof formik?.errors?.[id] === "string";
  const errorText = hasError ? (formik?.errors?.[id] as string) : undefined;

  return (
    <div className={className}>
      {label && (
        <div className="mb-1 block text-gray-800">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
      <TextInput
        id={id}
        name={id}
        value={formik.values[id] ?? ""}
        onChange={formik.handleChange}
        color={hasError ? "failure" : undefined}
        {...props}
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        rightIcon={rightIcon ? rightIcon : () => renderRightIcon()}
        disabled={formik.isSubmitting}
        theme={{
          field: {
            rightIcon: {
              base: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-auto",
            },
            input: {
              colors: {
                gray: "placeholder-gray-500 focus:border-tertiary focus:ring-tertiary font-prompt font-medium text-gray-600",
              },
            },
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
};
