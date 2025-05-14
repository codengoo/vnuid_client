import { HelperText, Label, Textarea, TextareaProps } from "flowbite-react";

interface IVnTextArea extends TextareaProps {
  label?: string;
  id: string;
  className?: string;
  helpText?: string;
}

export function VnTextArea({
  label,
  id,
  className,
  helpText,
  ...props
}: IVnTextArea) {
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
        color={helpText ? "failure" : void 0}
        {...props}
        theme={{
          colors: {
            gray: " placeholder-gray-500 focus:border-tertiary focus:ring-tertiary font-prompt font-medium text-gray-600",
          },
        }}
      />

      {helpText && (
        <HelperText>
          <span className="font-medium text-sm">{helpText}</span>
        </HelperText>
      )}
    </div>
  );
}
