import { default as cn } from "classnames";
import { MouseEvent } from "react";
import { IconType } from "react-icons";

interface IVnIconButtonProps {
  icon: IconType;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  color?: "default" | "primary" | "red";
  size?: "xs" | "md";
  className?: string;
}
export function VnIconButton({
  icon: Icon,
  color = "default",
  size = "md",
  className,
  onClick,
}: IVnIconButtonProps) {
  const handleClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    ev.preventDefault()
    onClick && onClick(ev);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-md hover:bg-gray-200 cursor-pointer w-fit h-fit flex-none",
        {
          "text-tertiary hover:bg-secondary": color === "primary",
          "text-red-500 hover:bg-red-100": color === "red",
        },
        className,
      )}
    >
      {Icon && <Icon size={size === "xs" ? 14 : 18} />}
    </button>
  );
}
