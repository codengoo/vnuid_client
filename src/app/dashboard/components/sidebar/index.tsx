import { VnLogo } from "@/app/components";
import { VnAvatar } from "@/app/components/avatar";
import { VnIconButton } from "@/app/components/ui";
import {
  LuChevronsRightLeft,
  LuClock,
  LuHouse,
  LuLifeBuoy,
  LuPresentation,
  LuSettings,
} from "react-icons/lu";
import { Tab } from "../tab";

export function Sidebar() {
  return (
    <div className="w-[350px] p-6 py-4 gap-8 flex flex-col">
      <div className="flex justify-between">
        <VnLogo />
        <VnIconButton icon={LuChevronsRightLeft} />
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1">
          <Tab icon={LuHouse} label="Home" url="/dashboard" />
          <Tab icon={LuPresentation} label="Lesson" url="/dashboard/lesson" />
          <Tab icon={LuClock} label="History" url="/dashboard/history" />
        </div>

        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <Tab icon={LuSettings} label="Settings" url="/settings" />
            <Tab icon={LuLifeBuoy} label="Helps" url="/faq" />
          </div>

          <VnAvatar />
        </div>
      </div>
    </div>
  );
}
