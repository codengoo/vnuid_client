"use client";

import { LessonCard } from "@/app/_components";
import { VnInput, VnSwitchMode } from "@/app/_components/ui";
import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { LuClock, LuClockAlert, LuSearch } from "react-icons/lu";

export default function Lesson() {
  return (
    <MainContentInfo>
      <HeaderContentInfo>
        <h2 className="text-3xl text-gray-600 font-semibold">
          Thứ 3, ngày 20 - 01 - 2025
        </h2>
        <h3 className="text-gray-500 font-medium">Tuần 15, Học kỳ 1, UET</h3>
      </HeaderContentInfo>

      <div className="space-y-4 mt-10">
        <div className="flex justify-between">
          <VnSwitchMode
            icon1={LuClockAlert}
            mode1="Incoming"
            icon2={LuClock}
            mode2="All lessons"
          />

          <VnInput
            placeholder="Search"
            rightIcon={LuSearch}
            id="lesson_search"
          />
        </div>

        <div className="grid grid-cols-4 gap-2 justify-between items-center">
          <LessonCard />
          <LessonCard />
          <LessonCard />
          <LessonCard />
          <LessonCard />
          <LessonCard />
          <LessonCard />
          <LessonCard />
          <LessonCard />
          <LessonCard />
        </div>
      </div>
    </MainContentInfo>
  );
}
