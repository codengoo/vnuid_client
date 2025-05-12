import { IconType } from "react-icons";

export interface IMenuItemProps {
  icon?: IconType;
  label: string;
  onClick?: () => void;
}

export function VnMenuItem({ icon: Icon, label, onClick }: IMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-gray-200 w-full p-2 cursor-pointer rounded-md text-gray-500 flex justify-start gap-2 hover:text-gray-700"
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );
}
