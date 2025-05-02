"use client";

import {
  LuChevronsRightLeft,
  LuClock,
  LuHeart,
  LuHouse,
  LuLifeBuoy,
  LuPresentation,
  LuSearch,
  LuSettings,
} from "react-icons/lu";
import { VnLogo } from "../components";
import { VnInput } from "../components/ui";
import { Tab } from "./components";

export default function Dashboard() {
  return (
    <div className="bg-primary-200 w-screen h-screen flex gap-4">
      <div className="w-[350px] p-6 gap-8 flex flex-col">
        <div className="flex  justify-between">
          <VnLogo />

          <button>
            <LuChevronsRightLeft size={18} color="#363636" />
          </button>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-1">
            <Tab icon={LuHouse} label="Home" url="/dashboard" />
            <Tab icon={LuPresentation} label="Lesson" url="lesson" />
            <Tab icon={LuClock} label="History" url="/history" />
          </div>

          <div className="flex flex-col gap-1">
            <Tab icon={LuSettings} label="Settings" url="/settings" />
            <Tab icon={LuLifeBuoy} label="Helps" url="/faq" />
          </div>
        </div>
      </div>

      <div className="h-full w-full flex flex-col">
        <div className="p-6 flex justify-center w-full">
          <VnInput
            id="search"
            className="w-1/4 bg-red"
            placeholder="Search"
            rightIcon={LuSearch}
          />
        </div>
        <div className="bg-white w-full h-full shadow-2xl rounded-tl-2xl"></div>
      </div>
    </div>
  );
}
