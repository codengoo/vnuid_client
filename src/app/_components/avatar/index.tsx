import { Avatar, Tooltip } from "flowbite-react";
import { IconType } from "react-icons";
import { LuChevronRight, LuCircleUser, LuLogOut } from "react-icons/lu";
import { VnIconButton } from "../ui";

interface IButtonItemProps {
  icon?: IconType;
  label: string;
}
const ButtonItem = ({ icon: Icon, label }: IButtonItemProps) => {
  return (
    <button className="hover:bg-gray-200 w-full p-2 cursor-pointer rounded-md text-gray-500 flex justify-start gap-2 hover:text-gray-700">
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );
};

export function VnAvatar() {
  const Menu = () => {
    return (
      <div className="w-fit min-w-[150px] flex flex-col">
        <ButtonItem icon={LuLogOut} label="Logout" />
        <ButtonItem icon={LuCircleUser} label="Profile" />
      </div>
    );
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar
        alt="user avatar"
        img="/images/avatar_male.png"
        theme={{
          root: { base: "flex items-center justify-start space-x-4 rounded" },
        }}
      />

      <div className="flex grow">
        <div className="w-full">
          <p className="font-semibold text-gray-800">Nguyen Van A</p>
          <p className="text-xs text-gray-600">Teacher</p>
        </div>

        <Tooltip content={<Menu />} style="light" animation="duration-300">
          <VnIconButton icon={LuChevronRight} />
        </Tooltip>
      </div>
    </div>
  );
}
