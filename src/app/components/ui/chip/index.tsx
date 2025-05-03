import { default as cn } from "classnames";

interface IVnChipProps {
  label: string;
  color?: "default" | "red" | "green";
}

export function VnChip({ label, color = "default" }: IVnChipProps) {
  return (
    <div
      className={cn(
        " border border-gray-300 px-2 py-0.5 rounded-md text-xs w-fit",
        { "bg-gray-200 text-gray-700": color === "default" },
        { "bg-secondary text-tertiary-200 border-tertiary": color === "green" },
        { "bg-orange-200 text-orange-500 border-orange-500": color === "red" },
      )}
    >
      <span>{label}</span>
    </div>
  );
}
