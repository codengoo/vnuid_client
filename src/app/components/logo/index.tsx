import Link from "next/link";
import { LuFingerprint } from "react-icons/lu";

export function VnLogo() {
  return (
    <div className="flex gap-4 items-center">
      <Link href={"/dashboard"}>
        <div className="p-3 w-fit h-fit rounded-xl bg-secondary text-tertiary-200 cursor-pointer">
          <LuFingerprint size={20} />
        </div>
      </Link>

      <div className="">
        <h1 className="font-normal text-xl font-lobster text-gray-800">
          Vnuid attendance
        </h1>
        <p className="text-sm text-gray-400 tracking-widest font-light">Teacher</p>
      </div>
    </div>
  );
}
