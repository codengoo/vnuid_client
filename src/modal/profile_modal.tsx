import { VnPopup } from "@/components";
import { useAuth } from "@/contexts";
import { Avatar } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

interface IUserProfileProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ItemInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between">
      <h2 className="font-semibold text-gray-700">{label}</h2>
      <h2 className="text-gray-800 text-sm">{value}</h2>
    </div>
  );
};

export const ProfileModal = ({ isOpen, setOpen }: IUserProfileProps) => {
  const { user } = useAuth();
  return (
    <VnPopup
      openModal={isOpen}
      setOpenModal={setOpen}
      title="Profile"
      hasCloseButton
    >
      <Avatar
        img={"/images/avatar_male.png"}
        rounded
        className="flex-none"
        size="xl"
      />

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{user?.name}</h1>
        <h2 className="text-sm text-gray-500">{user?.email}</h2>
      </div>

      <div className="bg-gray-100 border border-gray-300 p-2 rounded-lg">
        <ItemInfo label="Khoa" value={user?.department || ""} />
        <ItemInfo label="Số điện thoại" value={user?.phone || ""} />
        <ItemInfo label="Địa chỉ" value={user?.address || ""} />
      </div>
    </VnPopup>
  );
};
