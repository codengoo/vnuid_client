"use client";

import { VnLogo } from "@/app/_components";
import { VnAvatar } from "@/app/_components/avatar";
import { VnIconButton } from "@/components/ui";
import {
  LuBook,
  LuChevronsRightLeft,
  LuClock,
  LuHouse,
  LuLifeBuoy,
  LuPackage,
  LuPresentation,
  LuSettings,
  LuUsers,
  LuWifi,
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
          <Tab icon={LuPresentation} label="Lesson" url="/lesson" />
          <Tab icon={LuClock} label="History" url="/history" />
          <Tab icon={LuUsers} label="Add users" url="/admin/add_user" />
          <Tab icon={LuBook} label="Add courses" url="/admin/add_course" />
          <Tab icon={LuWifi} label="Add wifi" url="/admin/add_wifi" />
          <Tab icon={LuPackage} label="Add rooms" url="/admin/add_room" />
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
