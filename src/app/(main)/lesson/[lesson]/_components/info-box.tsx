import { default as cn } from "classnames";
import { Tooltip } from "flowbite-react";
import { LuBadgeAlert } from "react-icons/lu";

interface InfoBoxProps {
  title: string;
  description: string;
  value: number;
  color: "green" | "yellow";
}

export function InfoBox({ description, title, value, color }: InfoBoxProps) {
  return (
    <div
      className={cn("border rounded-lg p-4 flex items-center flex-col gap-4", {
        "border-tertiary bg-secondary text-tertiary-200": color === "green",
        "border-highlight-600 bg-highlight-200 text-highlight-600":
          color === "yellow",
      })}
    >
      <div className="flex items-center gap-2 justify-center">
        <h1 className="text-sm">{title}</h1>
        <Tooltip content={description}>
          <LuBadgeAlert size={18} />
        </Tooltip>
      </div>

      <span className="text-center text-5xl font-semibold">{value}</span>
    </div>
  );
}
