import { default as cn } from "classnames";
import { IconType } from "react-icons";

interface IVnIconButtonProps {
  icon: IconType;
  onClick?: () => void;
  color?: "default" | "primary";
}
export function VnIconButton({
  icon: Icon,
  color = "default",
}: IVnIconButtonProps) {
  return (
    <button
      className={cn(
        "p-2 rounded-md hover:bg-gray-200 cursor-pointer w-fit h-fit",
        { "text-tertiary hover:bg-secondary": color === "primary" },
      )}
    >
      {Icon && <Icon size={18} color="#363636" />}
    </button>
  );
}
