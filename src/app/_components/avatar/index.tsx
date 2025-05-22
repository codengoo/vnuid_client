import { useAuth } from "@/contexts";
import { logout } from "@/actions/login";
import { ProfileModal } from "@/modal";
import cn from "classnames";
import { Avatar, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LuChevronRight, LuCircleUser, LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { VnIconButton, VnMenu } from "../../../components/ui";
import { IMenuItemProps } from "../../../components/ui/menu/menu_item";

interface IVnAvatarNameProps {
  isCollapse: boolean;
}
export function VnAvatarName({ isCollapse }: IVnAvatarNameProps) {
  const { replace } = useRouter();
  const { user } = useAuth();
  const [isShowProfileModal, setShowProfileModal] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
      replace("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const menuData = useMemo(
    () =>
      [
        {
          label: "Logout",
          onClick: handleLogout,
          icon: LuLogOut,
        },
        {
          label: "Profile",
          icon: LuCircleUser,
          onClick: () => setShowProfileModal(true),
        },
      ] as IMenuItemProps[],
    [],
  );

  return (
    <div className={cn("flex items-center gap-4")}>
      <Avatar
        alt="user avatar"
        img="/images/avatar_male.png"
        className="flex-none"
      />

      {!isCollapse && (
        <div className="flex overflow-hidden grow">
          <div className="overflow-hidden grow">
            <p className="font-semibold text-gray-800 overflow-hidden text-nowrap truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-600">{user?.email}</p>
          </div>

          <Tooltip
            content={<VnMenu menu={menuData} />}
            style="light"
            animation="duration-300"
          >
            <VnIconButton icon={LuChevronRight} />
          </Tooltip>
        </div>
      )}

      <ProfileModal isOpen={isShowProfileModal} setOpen={setShowProfileModal} />
    </div>
  );
}
