"use client";

import { CourseCard, StudentCard } from "@/app/_components";
import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { VnDrawer, VnInput, VnSwitchMode } from "@/components";
import { getCourseDetails, getSubjects } from "@/helpers/subject";
import { ICourse, ICourseDetails } from "@/types";
import { formatCurrentDate } from "@/utils";
import { useEffect, useState } from "react";
import { LuClock, LuClockAlert, LuSearch } from "react-icons/lu";
import { toast } from "react-toastify";

export default function Lesson() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [courseDetail, setCourseDetail] = useState<ICourseDetails | null>(null);
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const prepare = async () => {
    try {
      const courses = await getSubjects();
      setCourses(courses);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleShowStudents = async (courseID: string) => {
    try {
      const course = await getCourseDetails(courseID);
      if (course) {
        setCourseDetail(course);
        setOpenDrawer(true);
      }
    } catch (error) {
      toast.error((error as Error).message);
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
          {courses.map((subject) => (
            <CourseCard
              key={subject.id}
              subject={subject}
              onShowStudents={() => handleShowStudents(subject.id)}
            />
          ))}
        </div>

        <VnDrawer isOpen={isOpenDrawer} setIsOpen={setOpenDrawer}>
          <div className="space-y-1">
            {courseDetail &&
              courseDetail?.students.map((student) => (
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
