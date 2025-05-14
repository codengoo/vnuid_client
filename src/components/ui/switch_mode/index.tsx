"use client";

import { default as cn } from "classnames";
import { useState } from "react";
import { IconType } from "react-icons";

interface VnSwitchModeProps {
  mode1: string;
  mode2: string;
  icon1: IconType;
  icon2: IconType;
}

interface ModeProps {
  label: string;
  icon: IconType;
  isActive?: boolean;
  onClick?: () => void;
  iconPos?: "left" | "right";
}
const Mode = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  iconPos = "left",
}: ModeProps) => {
  return (
    <div
      className={cn(
        "text-gray-600 flex items-center gap-2 text-sm px-2 py-1 rounded-lg cursor-pointer border border-transparent",
        {
          "font-semibold bg-secondary !border-tertiary-200": isActive,
        },
      )}
      onClick={() => onClick && onClick()}
    >
      {iconPos === "left" && <Icon size={18} />}
      <span>{label}</span>
      {iconPos === "right" && <Icon size={18} />}
    </div>
  );
};

export function VnSwitchMode({
  mode1,
  mode2,
  icon1,
  icon2,
}: VnSwitchModeProps) {
  const [mode, setMode] = useState("1");
  const handleClick = (value: string) => {
    setMode(value);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 w-fit h-fit rounded-xl border border-gray-300">
      <Mode
        icon={icon1}
        label={mode1}
        onClick={() => handleClick("1")}
        isActive={mode === "1"}
      />
      <Mode
        icon={icon2}
        label={mode2}
        onClick={() => handleClick("2")}
        isActive={mode === "2"}
        iconPos="right"
      />
    </div>
  );
}
