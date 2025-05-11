import { Label, TextInput, TextInputProps } from "flowbite-react";
import React, { ForwardedRef, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface IVnInput extends TextInputProps {
  label?: string;
  id: string;
  className?: string;
}
export const VnInput = React.forwardRef(function (
  { label, id, type, className, rightIcon, ...props }: IVnInput,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Only show the eye icons for password fields
  const renderRightIcon = () => {
    if (type !== "password") return undefined;

    return isVisible ? (
      <LuEye className="cursor-pointer" onClick={toggleVisibility} />
    ) : (
      <LuEyeOff className="cursor-pointer" onClick={toggleVisibility} />
    );
  };

  return (
    <div className={className}>
      {label && (
        <div className="mb-1 block text-gray-800">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
      <TextInput
        ref={ref}
        id={id}
        name={id}
        {...props}
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        rightIcon={rightIcon ? rightIcon : () => renderRightIcon()}
        theme={{
          field: {
            rightIcon: {
              base: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-auto",
            },
            input: {
              colors: {
                gray: "border-gray-300 bg-gray-50 placeholder-gray-500 focus:border-tertiary focus:ring-tertiary font-prompt font-medium text-gray-600",
              },
            },
          },
        }}
      />
    </div>
  );
});
