"use client";

import { LessonCard, StudentCard } from "@/app/_components";
import { VnInput, VnSwitchMode } from "@/components/ui";
import { VnDrawer } from "@/components/ui/drawer";
import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { getSubjectDetails, getSubjects } from "@/helpers/subject";
import { ICourse } from "@/types";
import { formatCurrentDate } from "@/utils";
import { useEffect, useState } from "react";
import { LuClock, LuClockAlert, LuSearch } from "react-icons/lu";

export default function Lesson() {
  const [subjects, setSubjects] = useState<ICourse[]>([]);
  const [subjectDetail, setSubjectDetail] = useState<ICourse | null>(null);
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const prepare = async () => {
    const subjects = await getSubjects();
    console.log(subjects);
    setSubjects(subjects);
  };

  const handleShowStudents = async (subjectId: string) => {
    const subject = await getSubjectDetails(subjectId);
    if (subject) {
      setSubjectDetail(subject);
      setOpenDrawer(true);
    }
  };

  useEffect(() => {
    prepare();
  }, []);

  return (
    <MainContentInfo>
      <HeaderContentInfo>
        <h2 className="text-3xl text-gray-600 font-semibold">
          {formatCurrentDate()}
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
          {subjects.map((subject) => (
            <LessonCard
              key={subject.id}
              subject={subject}
              onShowStudents={() => handleShowStudents(subject.id)}
              
            />
          ))}
        </div>

        <VnDrawer isOpen={isOpenDrawer} setIsOpen={setOpenDrawer}>
          <div className="space-y-1">
            {subjectDetail &&
              subjectDetail.students.map((student) => (
                <StudentCard
                  student={student}
                  style="highlight"
                  key={student.id}
                />
              ))}
          </div>
        </VnDrawer>
      </div>
    </MainContentInfo>
  );
}
