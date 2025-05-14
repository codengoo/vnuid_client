import cn from "classnames";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { VnInput } from "../../../components/ui";

interface ItemInfo {
  label: string;
  editable?: boolean;
  icon?: IconType;
  type?: "text" | "time" | "number";
  value?: any;
  id: string;
  onChange?: (value: any) => void;
  isTitle?: boolean;
}

export function VnEditable({
  label,
  icon: Icon,
  editable = true,
  type = "text",
  id,
  value,
  onChange,
  isTitle,
}: ItemInfo) {
  const [isEditMode, setEditMode] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleKeyEsc = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Escape") {
      setEditMode(false);
    }
  };

  const handleChangeMode = () => {
    if (!editable) return;
    setEditMode(!isEditMode);
  };

  const handleChangeValue = (e: ChangeEvent) => {
    if (!onChange) return;
    onChange((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (isEditMode && ref.current) {
      ref.current.focus();
    }
  }, [isEditMode]);

  if (!isEditMode)
    return (
      <div
        onClick={handleChangeMode}
        className={cn(
          "flex items-center gap-2 rounded-lg p-1 text-gray-600 hover:bg-gray-200",
          {
            "cursor-pointer": editable,
            "cursor-not-allowed": !editable,
          },
        )}
      >
        {Icon && <Icon size={14} />}
        <p
          className={cn("overflow-hidden truncate text-nowrap", {
            "text-2xl font-medium": isTitle,
            "text-sm": !isTitle,
          })}
        >
          {label}
        </p>
      </div>
    );

  if (isEditMode)
    return (
      <VnInput
        ref={ref}
        icon={Icon}
        id={id}
        onBlur={handleChangeMode}
        onKeyUp={handleKeyEsc}
        type={type}
        value={value}
        onChange={handleChangeValue}
      />
    );
}
