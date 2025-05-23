import { logout } from "@/helpers/login";
import { ProfileModal } from "@/modal";
import { Avatar, Tooltip } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LuChevronRight, LuCircleUser, LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";
import { VnIconButton, VnMenu } from "../../../components/ui";
import { IMenuItemProps } from "../../../components/ui/menu/menu_item";
import { useAuth } from "@/contexts";

export function VnAvatar() {
  const { replace } = useRouter();
  const {user} = useAuth()
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
          <p className="font-semibold text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-600">Teacher</p>
        </div>

        <Tooltip
          content={<VnMenu menu={menuData} />}
          style="light"
          animation="duration-300"
        >
          <VnIconButton icon={LuChevronRight} />
        </Tooltip>
      </div>

      <ProfileModal isOpen={isShowProfileModal} setOpen={setShowProfileModal} />
    </div>
  );
}
