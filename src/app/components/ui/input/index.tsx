import { Label, TextInput, TextInputProps } from "flowbite-react";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface IVnInput extends TextInputProps {
  label?: string;
  id: string;
}
export function VnInput({ label, id, type, ...props }: IVnInput) {
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
    <div>
      {label && (
        <div className="mb-1 block text-gray-800">
          <Label htmlFor={id}>{label}</Label>
        </div>
      )}
      <TextInput
        id={id}
        {...props}
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        rightIcon={() => renderRightIcon()}
        theme={{
          field: {
            rightIcon: {
              base: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-auto",
            },
            input: {
              colors: {
                gray: "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-tertiary focus:ring-tertiary font-prompt font-medium",
              },
            },
          },
        }}
      ></TextInput>
    </div>
  );
}
