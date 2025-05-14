import { default as cn } from "classnames";
import { toast } from "react-toastify";

interface IVnChipProps {
  label: string;
  color?: "default" | "red" | "green" | "yellow";
  copyable?: boolean;
  onClick?: () => void;
}

export function VnChip({
  label,
  color = "default",
  copyable,
  onClick,
}: IVnChipProps) {
  const handleClick = () => {
    if (copyable) {
      navigator.clipboard.writeText(label);
      toast("Copy thành công", { type: "success" });
    }
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border border-gray-300 px-2 py-0.5 rounded-md text-xs w-fit",
        { "bg-gray-200 text-gray-700": color === "default" },
        { "bg-secondary text-tertiary-200 border-tertiary": color === "green" },
        { "bg-orange-200 text-orange-500 border-orange-500": color === "red" },
        {
          "bg-highlight-200 text-highlight-600 border-highlight-600":
            color === "yellow",
        },
        { "cursor-pointer": copyable || onClick },
      )}
    >
      <span>{label}</span>
    </div>
  );
}
