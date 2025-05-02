"use client";

import {
  LuChevronsRightLeft,
  LuClock,
  LuHouse,
  LuPresentation,
} from "react-icons/lu";
import { VnLogo } from "../components";
import { Tab } from "./components";

export default function Dashboard() {
  return (
    <div className="bg-primary-200 w-screen h-screen flex">
      <div className="w-[350px] p-6 space-y-8">
        <div className="flex  justify-between">
          <VnLogo />

          <button>
            <LuChevronsRightLeft size={18} color="#363636"/>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <Tab icon={LuHouse} label="Home" url="/dashboard" />
          <Tab icon={LuPresentation} label="Lesson" url="lesson" />
          <Tab icon={LuClock} label="History" url="history" />
        </div>
      </div>
      <div className="h-full w-full flex flex-col">
        <div className="h-16"></div>
        <div className="bg-white w-full h-full shadow-2xl rounded-tl-2xl"></div>
      </div>
    </div>
  );
}
