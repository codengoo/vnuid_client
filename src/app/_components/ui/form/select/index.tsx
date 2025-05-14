import { HelperText, Label, Select, SelectProps } from "flowbite-react";

interface IVnSelectProps extends SelectProps {
  label?: string;
  id: string;
  className?: string;
  helpText?: string;
  options: {
    label: string;
    value: string;
  }[];
}
export function VnSelect({
  id,
  label,
  className,
  helpText,
  ...props
}: IVnSelectProps) {
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
        theme={{
          field: {
            select: {
              colors: {
                gray: "placeholder-gray-500 focus:border-tertiary focus:ring-tertiary font-prompt font-medium text-gray-600",
              },
            },
          },
        }}
        {...props}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {helpText && (
        <HelperText>
          <span className="font-medium text-sm">{helpText}</span>
        </HelperText>
      )}
    </div>
  );
}
