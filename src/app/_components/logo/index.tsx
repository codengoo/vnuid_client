import { useAuth } from "@/contexts";
import Link from "next/link";
import { LuFingerprint } from "react-icons/lu";

interface IVnLogoProps {
  isCollapsed: boolean;
}
export function VnLogo({ isCollapsed }: IVnLogoProps) {
  const { user } = useAuth();
  return (
    <div className="flex gap-4 items-center">
      <Link href={"/dashboard"}>
        <div className="p-3 w-fit h-fit rounded-xl bg-secondary text-tertiary-200 cursor-pointer">
          <LuFingerprint size={20} />
        </div>
      </Link>

      {!isCollapsed && (
        <div>
          <h1 className="font-normal text-xl font-lobster text-gray-800">
            Vnuid attendance
          </h1>
          <p className="text-xs text-gray-400 tracking-widest font-light italic">
            {user
              ? user.role === "teacher"
                ? "Giáo viên"
                : user.role === "admin"
                  ? "Quản lý"
                  : "Vô danh"
              : ""}
          </p>
        </div>
      )}
    </div>
  );
}
