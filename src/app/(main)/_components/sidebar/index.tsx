"use client";

import { VnLogo } from "@/app/_components";
import { VnAvatarName } from "@/app/_components/avatar";
import { VnIconButton } from "@/components";
import { useAuth } from "@/contexts";
import cn from "classnames";
import { useState } from "react";
import {
  LuBook,
  LuChevronsRightLeft,
  LuClock,
  LuLifeBuoy,
  LuPackage,
  LuPresentation,
  LuSettings,
  LuUsers,
  LuWifi,
} from "react-icons/lu";
import { Tab } from "../tab";

export function Sidebar() {
  const [isCollapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!isCollapsed);
  const { user } = useAuth();
  return (
    <div
      className={cn("flex-none p-6 py-4 gap-8 flex flex-col", {
        "w-[300px]": !isCollapsed,
      })}
    >
      <div
        className={cn("flex justify-between", {
          "flex-col gap-2 items-center": isCollapsed,
        })}
      >
        <VnLogo isCollapsed={isCollapsed} />
        <VnIconButton icon={LuChevronsRightLeft} onClick={toggleCollapsed} />
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-1">
          {user && user.role === "teacher" && (
            <>
              <Tab
                icon={LuPresentation}
                label="Môn học"
                url="/lesson"
                isCollapsed={isCollapsed}
              />
              <Tab
                icon={LuClock}
                label="Lịch sử"
                url="/history"
                isCollapsed={isCollapsed}
              />
            </>
          )}
          {user && user.role === "admin" && (
            <>
              <Tab
                icon={LuUsers}
                label="Thêm tài khoản"
                url="/admin/user"
                isCollapsed={isCollapsed}
              />
              <Tab
                icon={LuBook}
                label="Thêm khóa học"
                url="/admin/course"
                isCollapsed={isCollapsed}
              />
              <Tab
                icon={LuPackage}
                label="Thêm phòng"
                url="/admin/room"
                isCollapsed={isCollapsed}
              />
              <Tab
                icon={LuWifi}
                label="Thêm wifi"
                url="/admin/wifi"
                isCollapsed={isCollapsed}
              />
            </>
          )}
        </div>

        <div
          className={cn("gap-2 flex flex-col", { "items-center": isCollapsed })}
        >
          <div className="flex flex-col gap-1">
            <Tab
              icon={LuSettings}
              label="Settings"
              url="/settings"
              isCollapsed={isCollapsed}
            />
            <Tab
              icon={LuLifeBuoy}
              label="Helps"
              url="/faq"
              isCollapsed={isCollapsed}
            />
          </div>

          <VnAvatarName isCollapse={isCollapsed} />
        </div>
      </div>
    </div>
  );
}
