"use client";

import { getCoursesAsAdmin } from "@/actions/admin";
import { defaultCourseValue } from "@/configs";
import { useSetup } from "@/hooks";
import { CourseInfo, CourseTable } from "./_components";

export default function AddCourse() {
  const { handleRowClick, preload, value, values } = useSetup({
    defaultValues: defaultCourseValue,
    preloadFn: getCoursesAsAdmin,
  });

  return (
    <div>
      <div className="grid grid-cols-5 gap-12">
        <CourseTable courses={values} onRowClick={handleRowClick} />
        <CourseInfo values={values} value={value} onChange={preload} />
      </div>
    </div>
  );
}
