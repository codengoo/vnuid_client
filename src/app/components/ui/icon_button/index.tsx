import { IconType } from "react-icons";

interface IVnIconButtonProps {
  icon: IconType;
  onClick?: () => void;
}
export function VnIconButton({ icon: Icon }: IVnIconButtonProps) {
  return (
    <button className="p-2 rounded-md hover:bg-gray-200 cursor-pointer w-fit h-fit">
      {Icon && <Icon size={18} color="#363636" />}
    </button>
  );
}
