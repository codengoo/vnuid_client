import { default as cn } from "classnames";
import { IconType } from "react-icons";

interface IVnIconButtonProps {
  icon: IconType;
  onClick?: () => void;
  color?: "default" | "primary";
  size?: "xs" | "md";
  className?: string;
}
export function VnIconButton({
  icon: Icon,
  color = "default",
  size = "md",
  className,
}: IVnIconButtonProps) {
  return (
    <button
      className={cn(
        "p-2 rounded-md hover:bg-gray-200 cursor-pointer w-fit h-fit",
        { "text-tertiary hover:bg-secondary": color === "primary" },
        className,
      )}
    >
      {Icon && <Icon size={size === "xs" ? 14 : 18} color="#363636" />}
    </button>
  );
}
