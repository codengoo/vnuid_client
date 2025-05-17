import { Button, ButtonProps } from "flowbite-react";
import { IconType } from "react-icons";

interface IVnButtonProps extends ButtonProps {
  icon?: IconType;
  label: string;
}

export function VnButton({ id, icon: Icon, label, ...props }: IVnButtonProps) {
  return (
    <Button
      id={id}
      {...props}
      className="cursor-pointer gap-2"
      theme={{
        color: {
          default:
            "bg-tertiary text-white hover:bg-tertiary-200 focus:ring-tertiary-200 focus:ring-2",
          alternative:
            "border border-gray-200 bg-white text-tertiary hover:bg-gray-100 hover:text-tertiary-200 focus:ring-tertiary focus:ring-2",
        },
      }}
    >
      {Icon && <Icon size={20} className="flex-none"/>}
      <span className="overflow-hidden text-nowrap truncate">{label}</span>
    </Button>
  );
}
