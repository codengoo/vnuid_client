import { default as cn } from "classnames";
import { toast } from "react-toastify";

interface IVnChipProps {
  label: string;
  color?: "default" | "red" | "green" | "yellow";
  copyable?: boolean;
}

export function VnChip({ label, color = "default", copyable }: IVnChipProps) {
  const handleCopy = () => {
    copyable && navigator.clipboard.writeText(label);
    toast("Copy thành công", { type: "success" });
    console.log("copied");
  };

  return (
    <div
      onClick={handleCopy}
      className={cn(
        " border border-gray-300 px-2 py-0.5 rounded-md text-xs w-fit",
        { "bg-gray-200 text-gray-700": color === "default" },
        { "bg-secondary text-tertiary-200 border-tertiary": color === "green" },
        { "bg-orange-200 text-orange-500 border-orange-500": color === "red" },
        {
          "bg-highlight-200 text-highlight-600 border-highlight-600":
            color === "yellow",
        },
        { "cursor-pointer": copyable },
      )}
    >
      <span>{label}</span>
    </div>
  );
}
